exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const cookies = event.headers['x-swiggy-cookies'] || ''
    console.log('[swiggy-update] cookies:', cookies.slice(0, 80))

    const res = await fetch('https://www.swiggy.com/dapi/restaurants/list/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Origin: 'https://www.swiggy.com',
        Referer: 'https://www.swiggy.com/',
        ...(cookies && { Cookie: cookies }),
      },
      body: event.body,
    })

    const text = await res.text()
    console.log('[swiggy-update] status:', res.status, '| preview:', text.slice(0, 150))

    if (!text.trim()) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { cards: [], pageOffset: null } }),
      }
    }

    const data = JSON.parse(text)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  } catch (e) {
    console.error('[swiggy-update] error:', e.message)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: e.message }),
    }
  }
}
