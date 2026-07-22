import RestaurantCard, { withDiscountOffer } from '../restaurant/RestaurantCard'
import { useState, useEffect, useRef, useCallback } from 'react'
import Shimmer from '../shared/Shimmer'
import { Link, useNavigate } from 'react-router-dom'
import useOnlineStatus from '../../utils/useOnlineStatus'
import MOCK_RESTAURANTS from '../../mocks/mockRestaurants'
import { CATEGORIES } from '../../utils/categories'
import '../../css/Body.css'

const SWIGGY_LIST_URL    = '/.netlify/functions/swiggy-list'
const SWIGGY_UPDATE_URL  = '/.netlify/functions/swiggy-update'
const MOCK_PER_PAGE = 20

// Search every card for the restaurant grid — Swiggy's index shifts between responses
const extractRestaurants = (cards = []) => {
  for (const card of cards) {
    const list = card?.card?.card?.gridElements?.infoWithStyle?.restaurants
    if (list?.length) return list
  }
  return []
}

const FILTERS = [
  { id: 'all',    label: 'All' },
  { id: 'rating', label: '⭐  Rating 4.0+' },
  { id: 'fast',   label: '⚡  Under 30 min' },
  { id: 'veg',    label: '🥦  Pure Veg' },
  { id: 'offers', label: '🎁  Offers' },
]

const applyFilters = (list, filter, search) => {
  let result = [...list]

  if (search.trim()) {
    result = result.filter((r) =>
      r.info.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  switch (filter) {
    case 'rating':  result = result.filter((r) => r.info.avgRating >= 4.0); break
    case 'fast':    result = result.filter((r) => (r.info.sla?.deliveryTime ?? 99) <= 30); break
    case 'veg':     result = result.filter((r) => r.info.veg); break
    case 'offers':  result = result.filter((r) => r.info.aggregatedDiscountInfoV3); break
    default: break
  }

  return result
}

const Body = () => {
  const [allRestaurants, setAllRestaurants]           = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [searchText, setSearchText]                   = useState('')
  const [activeFilter, setActiveFilter]               = useState('all')
  const [isLoading, setIsLoading]                     = useState(true)
  const [isFetchingMore, setIsFetchingMore]           = useState(false)
  const [hasMore, setHasMore]                         = useState(false)

  // Swiggy pagination tokens
  const [nextOffset, setNextOffset]   = useState(null)
  const [widgetOffset, setWidgetOffset] = useState({})

  // Mock pagination
  const [mockPage, setMockPage]     = useState(0)
  const usingMockRef                = useRef(false)
  const swiggySessionRef            = useRef('')      // Swiggy session cookies forwarded on pagination
  const realImageIdsRef             = useRef([])      // real Swiggy cloudinaryImageIds to reuse in mocks

  // Infinite scroll
  const observerRef  = useRef(null)     // holds the IntersectionObserver instance
  const loadMoreRef  = useRef(null)     // always points to the latest loadMore
  const fetchingRef  = useRef(false)    // prevents double-fire from observer

  const navigate = useNavigate()
  const RestaurantCardWithDiscount = withDiscountOffer(RestaurantCard)
  const onlineStatus = useOnlineStatus()

  // ── Initial fetch ──────────────────────────────────────────────────────────
  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res  = await fetch(SWIGGY_LIST_URL)
      const json = await res.json()
      const restaurants = extractRestaurants(json?.data?.cards)

      console.log('[BiteSwift] initial load — restaurants:', restaurants.length, '| pageOffset:', json?.data?.pageOffset)

      if (restaurants.length > 0) {
        setAllRestaurants(restaurants)
        usingMockRef.current = false
        swiggySessionRef.current = json?.__cookies || ''

        // Bank real image IDs so mock cards can borrow them
        realImageIdsRef.current = restaurants
          .map((r) => r.info.cloudinaryImageId)
          .filter((id) => id && !id.startsWith('http'))

        const pageOffset = json?.data?.pageOffset
        setNextOffset(pageOffset?.nextOffset ?? null)
        setWidgetOffset(pageOffset?.widgetOffset ?? {})
        setHasMore(!!pageOffset?.nextOffset)
      } else {
        console.log('[BiteSwift] Swiggy returned 0 restaurants — falling back to mock')
        loadMockBatch(0)
      }
    } catch (e) {
      console.log('[BiteSwift] Swiggy fetch failed:', e.message, '— falling back to mock')
      loadMockBatch(0)
    } finally {
      setIsLoading(false)
    }
  }

  // Replace mock cloudinaryImageIds with real Swiggy IDs (cycled) when available
  const augmentBatch = (batch, offset) => {
    const ids = realImageIdsRef.current
    if (!ids.length) return batch
    return batch.map((r, i) => ({
      ...r,
      info: { ...r.info, cloudinaryImageId: ids[(offset + i) % ids.length] },
    }))
  }

  const loadMockBatch = (page, append = false) => {
    const raw = MOCK_RESTAURANTS.slice(page * MOCK_PER_PAGE, (page + 1) * MOCK_PER_PAGE)
    const batch = augmentBatch(raw, page * MOCK_PER_PAGE)
    setAllRestaurants((prev) => (page === 0 && !append ? batch : [...prev, ...batch]))
    setMockPage(page + 1)
    setHasMore((page + 1) * MOCK_PER_PAGE < MOCK_RESTAURANTS.length)
    usingMockRef.current = true
  }

  // ── Load more (called by intersection observer) ────────────────────────────
  const loadMore = async () => {
    if (fetchingRef.current || !hasMore) return
    fetchingRef.current = true
    setIsFetchingMore(true)

    try {
      if (usingMockRef.current) {
        // Small delay so the spinner is visible and rapid re-fires are impossible
        await new Promise((r) => setTimeout(r, 600))
        loadMockBatch(mockPage)
      } else {
        // Hit Swiggy's real pagination API
        const res = await fetch(SWIGGY_UPDATE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-swiggy-cookies': swiggySessionRef.current,
          },
          body: JSON.stringify({
            lat: 12.9046136,
            lng: 77.614948,
            nextOffset,
            widgetOffset,
            filters: {},
            seoParams: {
              seoUrl: 'https://www.swiggy.com/',
              pageType: 'DESKTOP_WEB_LISTING',
              apiName: 'FoodHomePage',
            },
            pageType: 'DESKTOP_WEB_LISTING',
            type: 'DESKTOP_WEB_LISTING',
          }),
        })
        const json = await res.json()
        const more = extractRestaurants(json?.data?.cards)
        const pageOffset = json?.data?.pageOffset

        console.log('[BiteSwift] pagination — got:', more.length, '| nextOffset:', pageOffset?.nextOffset)

        if (more.length > 0) {
          setAllRestaurants((prev) => [...prev, ...more])
          setNextOffset(pageOffset?.nextOffset ?? null)
          setWidgetOffset(pageOffset?.widgetOffset ?? {})
          setHasMore(!!pageOffset?.nextOffset)
        } else {
          // Swiggy pagination dry — append mocks seamlessly with real images
          console.log('[BiteSwift] Swiggy pagination empty — switching to mock append')
          loadMockBatch(0, true)
        }
      }
    } catch {
      // Swiggy pagination failed — fall back to mock continuation
      if (!usingMockRef.current) {
        usingMockRef.current = true
        loadMockBatch(0)
      } else {
        setHasMore(false)
      }
    } finally {
      fetchingRef.current = false
      setIsFetchingMore(false)
    }
  }

  // Keep ref current every render so the observer always calls the latest version
  loadMoreRef.current = loadMore

  // Callback ref — fires when the sentinel mounts/unmounts (after data loads),
  // so the observer always attaches to a real DOM node.
  const sentinelRef = useCallback((node) => {
    if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null }
    if (!node) return
    observerRef.current = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMoreRef.current() },
      { rootMargin: '0px' }
    )
    observerRef.current.observe(node)
  }, [])

  // ── Re-filter whenever search / filter / category / allRestaurants changes ─
  useEffect(() => {
    setFilteredRestaurants(
      applyFilters(allRestaurants, activeFilter, searchText)
    )
  }, [searchText, activeFilter, allRestaurants])

  const handleFilterClick = (id) =>
    setActiveFilter((prev) => (prev === id ? 'all' : id))

  if (onlineStatus === false)
    return (
      <div className="offline-screen">
        <span className="offline-icon">📡</span>
        <h2>You're offline</h2>
        <p>Check your internet connection and try again.</p>
      </div>
    )

  return (
    <div className="home-page">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">🍽️ &nbsp;Food delivery, redefined</p>
          <h1 className="hero-headline">
            Hungry? <br />
            <span className="hero-accent">We've got you.</span>
          </h1>
          <p className="hero-sub">
            Order from the best restaurants around you — fast, fresh, and always on time.
          </p>

          <div className="hero-search">
            <span className="hero-search-icon">🔍</span>
            <input
              className="hero-search-input"
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button className="hero-search-clear" onClick={() => setSearchText('')}>✕</button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="category-scroll-wrapper">
          <div className="category-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                className="category-pill"
                onClick={() => navigate(`/collection/${cat.slug}`)}
              >
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────── */}
      <div className="filter-bar">
        <div className="filter-chips">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-chip ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        {!isLoading && (
          <p className="results-count">
            {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* ── Restaurant grid ───────────────────────────────────── */}
      <section className="restaurants-section">
        {isLoading ? (
          <Shimmer />
        ) : filteredRestaurants.length === 0 ? (
          <div className="empty-state">
            <span>🍽️</span>
            <h3>No restaurants found</h3>
            <p>Try a different search or clear your filters.</p>
            <button onClick={() => { setSearchText(''); setActiveFilter('all') }}>
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <h2 className="section-title">
              {searchText
                ? `Results for "${searchText}"`
                : 'Restaurants near you'}
            </h2>
            <div className="restaurant-grid">
              {filteredRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.info.id}
                  to={'/restaurant/' + restaurant.info.id}
                  className="card-link"
                >
                  {restaurant.info.aggregatedDiscountInfoV3
                    ? <RestaurantCardWithDiscount resData={restaurant} />
                    : <RestaurantCard resData={restaurant} />
                  }
                </Link>
              ))}
            </div>

            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} className="scroll-sentinel">
              {isFetchingMore && (
                <div className="fetching-more">
                  <span className="fetching-spinner" />
                  <span>Loading more restaurants…</span>
                </div>
              )}
              {!hasMore && allRestaurants.length > 0 && (
                <p className="end-of-list">You've seen all restaurants nearby 🍽️</p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Body
