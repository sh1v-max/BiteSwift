const NAV_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
}

const extractCookies = (res) => {
  const raw = res.headers.getSetCookie
    ? res.headers.getSetCookie()
    : (res.headers.get('set-cookie') || '').split(/,(?=\s*[a-zA-Z_]+=)/)
  return raw.map((c) => c.split(';')[0].trim()).filter(Boolean)
}

exports.handler = async (event) => {
  const { collection, tags = '', offset = '0' } = event.queryStringParameters || {}

  if (!collection) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'collection param required' }),
    }
  }

  try {
    // Step 1 — get a session cookie from the homepage (same as swiggy-list)
    const homeRes = await fetch('https://www.swiggy.com/', { headers: NAV_HEADERS })
    const homeCookies = extractCookies(homeRes)
    const sessionCookie = homeCookies.join('; ')
    console.log(`[swiggy-collection] homepage cookies: ${sessionCookie.slice(0, 80)}`)

    // Step 2 — call the collection endpoint with that session
    const url =
      `https://www.swiggy.com/dapi/restaurants/list/v5` +
      `?lat=12.9046136&lng=77.614948` +
      `&collection=${collection}` +
      `&tags=${tags}` +
      `&sortBy=&filters=&type=rcv2` +
      `&offset=${offset}` +
      `&page_type=null`

    const res = await fetch(url, {
      headers: {
        ...NAV_HEADERS,
        Accept: 'application/json, text/plain, */*',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        Origin: 'https://www.swiggy.com',
        Referer: 'https://www.swiggy.com/',
        ...(sessionCookie && { Cookie: sessionCookie }),
      },
    })

    const text = await res.text()
    console.log(`[swiggy-collection] collection=${collection} offset=${offset} status=${res.status} len=${text.length}`)

    if (!text.trim()) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { cards: [] } }),
      }
    }

    const data = JSON.parse(text)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  } catch (e) {
    console.error('[swiggy-collection] error:', e.message)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: e.message }),
    }
  }
}
