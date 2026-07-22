import RestaurantCard, { withDiscountOffer } from '../restaurant/RestaurantCard'
import { useState, useEffect, useRef, useCallback } from 'react'
import Shimmer from '../shared/Shimmer'
import { Link, useNavigate } from 'react-router-dom'
import useOnlineStatus from '../../utils/useOnlineStatus'
import { CATEGORIES } from '../../utils/categories'
import '../../css/Body.css'

const SWIGGY_LIST_URL    = '/.netlify/functions/swiggy-list'
const SWIGGY_UPDATE_URL  = '/.netlify/functions/swiggy-update'

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
  const swiggySessionRef            = useRef('')      // Swiggy session cookies forwarded on pagination

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

      setAllRestaurants(restaurants)
      swiggySessionRef.current = json?.__cookies || ''

      const pageOffset = json?.data?.pageOffset
      setNextOffset(pageOffset?.nextOffset ?? null)
      setWidgetOffset(pageOffset?.widgetOffset ?? {})
      setHasMore(!!pageOffset?.nextOffset)
    } catch (e) {
      console.log('[BiteSwift] Swiggy fetch failed:', e.message)
      setAllRestaurants([])
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  // ── Load more (called by intersection observer) ────────────────────────────
  const loadMore = async () => {
    if (fetchingRef.current || !hasMore) return
    fetchingRef.current = true
    setIsFetchingMore(true)

    try {
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

      setAllRestaurants((prev) => [...prev, ...more])
      setNextOffset(pageOffset?.nextOffset ?? null)
      setWidgetOffset(pageOffset?.widgetOffset ?? {})
      setHasMore(!!pageOffset?.nextOffset)
    } catch (e) {
      console.log('[BiteSwift] pagination failed:', e.message)
      setHasMore(false)
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

      {/* ── Hero — full viewport ──────────────────────────── */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🔥 Hot &amp; fresh, always</span>
          <h1 className="hero-headline">
            HUNGRY?<br />
            <span className="hero-accent">WE'VE GOT YOU.</span>
          </h1>
          <p className="hero-sub">
            200+ restaurants. One tap. Delivered fast.
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
          <div className="hero-stats">
            <div className="hstat"><strong>200+</strong><span>Restaurants</span></div>
            <div className="hstat-sep" />
            <div className="hstat"><strong>30 min</strong><span>Avg delivery</span></div>
            <div className="hstat-sep" />
            <div className="hstat"><strong>4.8 ★</strong><span>Avg rating</span></div>
          </div>
        </div>
      </section>

      {/* ── How it works strip ───────────────────────────── */}
      <div className="how-strip">
        <div className="how-item">
          <div className="how-icon-wrap">🗺️</div>
          <div className="how-text">
            <strong>Browse restaurants</strong>
            <span>200+ local spots near you</span>
          </div>
        </div>
        <div className="how-divider" />
        <div className="how-item">
          <div className="how-icon-wrap">🛒</div>
          <div className="how-text">
            <strong>Build your order</strong>
            <span>Customize every item your way</span>
          </div>
        </div>
        <div className="how-divider" />
        <div className="how-item">
          <div className="how-icon-wrap">🛵</div>
          <div className="how-text">
            <strong>Track live</strong>
            <span>Door-to-door, in real time</span>
          </div>
        </div>
      </div>

      {/* ── Feature row 1 — speed ────────────────────────── */}
      <section className="feature-row">
        <div className="feature-row__inner">
          <div className="feature-row__text">
            <p className="eyebrow">Fast. Every time.</p>
            <h2 className="feature-row__heading">Your food,<br />in 30 minutes.</h2>
            <p className="feature-row__desc">
              We've optimized every step so your food arrives hot, fast, and exactly as you ordered it.
            </p>
          </div>
          <div className="feature-row__visual">
            <div className="fvisual-card">
              <p className="fvc-label">Your order</p>
              <div className="fvc-steps">
                <div className="fvc-step fvc-step--done">
                  <span className="fvcs-dot" />
                  <span className="fvcs-name">Order received</span>
                  <span className="fvcs-time">0:00</span>
                </div>
                <div className="fvc-step fvc-step--done">
                  <span className="fvcs-dot" />
                  <span className="fvcs-name">Kitchen preparing</span>
                  <span className="fvcs-time">5:12</span>
                </div>
                <div className="fvc-step fvc-step--active">
                  <span className="fvcs-dot" />
                  <span className="fvcs-name">On the way</span>
                  <span className="fvcs-time">18:30</span>
                </div>
                <div className="fvc-step">
                  <span className="fvcs-dot" />
                  <span className="fvcs-name">Delivered</span>
                  <span className="fvcs-time">~28 min</span>
                </div>
              </div>
              <div className="fvc-eta">Estimated arrival <strong>28 min</strong> 🛵</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature row 2 — variety, reversed ────────────── */}
      <section className="feature-row feature-row--alt">
        <div className="feature-row__inner feature-row__inner--reverse">
          <div className="feature-row__text">
            <p className="eyebrow">Every craving covered</p>
            <h2 className="feature-row__heading">Whatever you're<br />in the mood for.</h2>
            <p className="feature-row__desc">
              Late-night biryani. Weekend brunch. Midnight dessert. 20 cuisines across 200+ restaurants — all in one place.
            </p>
          </div>
          <div className="feature-row__visual">
            <div className="fvisual-cravings">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <button
                  key={cat.slug}
                  className="fvc-craving"
                  style={{ background: `linear-gradient(135deg, ${cat.color[0]}, ${cat.color[1]})` }}
                  onClick={() => navigate(`/collection/${cat.slug}`)}
                >
                  <span className="fvc-craving-emoji">{cat.emoji}</span>
                  <span className="fvc-craving-label">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────── */}
      <section className="categories-section">
        <div className="section-inner">
          <p className="eyebrow">Explore by craving</p>
          <h2 className="section-heading">What are you in the mood for?</h2>
        </div>
        <div className="category-scroll-wrapper">
          <div className="category-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                className="category-pill"
                style={{ background: `linear-gradient(145deg, ${cat.color[0]}, ${cat.color[1]})` }}
                onClick={() => navigate(`/collection/${cat.slug}`)}
              >
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────── */}
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

      {/* ── Restaurant grid ──────────────────────────────── */}
      <section className="restaurants-section">
        {isLoading ? (
          <Shimmer />
        ) : allRestaurants.length === 0 ? (
          <div className="empty-state">
            <span>📡</span>
            <h3>Couldn't load restaurants</h3>
            <p>Something went wrong reaching Swiggy. Please try again.</p>
            <button onClick={fetchData}>Retry</button>
          </div>
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
              {searchText ? `Results for "${searchText}"` : 'Restaurants near you'}
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
