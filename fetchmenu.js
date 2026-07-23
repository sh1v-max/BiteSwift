// Standalone diagnostic script — no proxy, no cookies, just a plain fetch
// to see whether Swiggy's menu API returns real data at all from here.

const URL =
  'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9753&lng=77.591&restaurantId=755276&catalog_qa=undefined&query=Pizza&submitAction=ENTER'

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://www.swiggy.com/',
  Origin: 'https://www.swiggy.com',
}

const run = async () => {
  console.log('Fetching:', URL)
  const res = await fetch(URL, { headers: HEADERS })
  const text = await res.text()

  console.log('Status:', res.status)
  console.log('Body length:', text.length)
  console.log('Body preview:', text.slice(0, 300) || '(empty)')
}

run().catch((e) => console.error('Fetch failed:', e.message))
