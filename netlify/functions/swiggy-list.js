const BROWSER_HEADERS = {
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

const LIST_URL =
  'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9046136&lng=77.614948&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'

const extractCookies = (res) => {
  const raw = res.headers.getSetCookie
    ? res.headers.getSetCookie()
    : (res.headers.get('set-cookie') || '').split(/,(?=\s*[a-zA-Z_]+=)/)
  return raw.map((c) => c.split(';')[0].trim()).filter(Boolean)
}

exports.handler = async () => {
  try {
    // Step 1 — hit the homepage so Swiggy sets __SW session cookie
    const homeRes = await fetch('https://www.swiggy.com/', { headers: BROWSER_HEADERS })
    const homeCookies = extractCookies(homeRes)
    console.log('[swiggy-list] homepage cookies:', homeCookies.join('; ').slice(0, 120))

    const sessionCookie = homeCookies.join('; ')

    // Step 2 — call the API with the session cookie
    const res = await fetch(LIST_URL, {
      headers: {
        ...BROWSER_HEADERS,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        Origin: 'https://www.swiggy.com',
        Referer: 'https://www.swiggy.com/',
        Cookie: sessionCookie,
      },
    })

    // Merge homepage cookies + API cookies (API may refresh __SW)
    const apiCookies = extractCookies(res)
    const allCookies = Object.fromEntries(
      [...homeCookies, ...apiCookies].map((c) => [c.split('=')[0], c])
    )
    const finalCookies = Object.values(allCookies).join('; ')

    console.log('[swiggy-list] api status:', res.status, '| final cookies:', finalCookies.slice(0, 120))

    const data = await res.json()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, __cookies: finalCookies }),
    }
  } catch (e) {
    console.error('[swiggy-list] error:', e.message)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: e.message }),
    }
  }
}
