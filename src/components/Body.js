import RestaurantCard, { withDiscountOffer } from './RestaurantCard'
import { useState, useEffect, useCallback } from 'react'
import Shimmer from './Shimmer'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import MOCK_RESTAURANTS from '../mocks/mockRestaurants'
import '../css/Body.css'

const CATEGORIES = [
  { emoji: '🍕', label: 'Pizza' },
  { emoji: '🍔', label: 'Burgers' },
  { emoji: '🍗', label: 'Biryani' },
  { emoji: '🍜', label: 'Chinese' },
  { emoji: '🌮', label: 'Rolls' },
  { emoji: '🥗', label: 'Healthy' },
  { emoji: '🍦', label: 'Desserts' },
  { emoji: '☕', label: 'Cafe' },
  { emoji: '🧆', label: 'Kebabs' },
  { emoji: '🥞', label: 'Breakfast' },
]

const FILTERS = [
  { id: 'all',    label: 'All' },
  { id: 'rating', label: '⭐  Rating 4.0+' },
  { id: 'fast',   label: '⚡  Under 30 min' },
  { id: 'veg',    label: '🥦  Pure Veg' },
  { id: 'offers', label: '🎁  Offers' },
]

const applyFilters = (list, filter, category, search) => {
  let result = [...list]

  if (category) {
    result = result.filter((r) =>
      r.info.cuisines?.some((c) =>
        c.toLowerCase().includes(category.toLowerCase())
      )
    )
  }

  if (search.trim()) {
    result = result.filter((r) =>
      r.info.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  switch (filter) {
    case 'rating':
      result = result.filter((r) => r.info.avgRating >= 4.0)
      break
    case 'fast':
      result = result.filter((r) => (r.info.sla?.deliveryTime ?? 99) <= 30)
      break
    case 'veg':
      result = result.filter((r) => r.info.veg)
      break
    case 'offers':
      result = result.filter((r) => r.info.aggregatedDiscountInfoV3)
      break
    default:
      break
  }

  return result
}

const Body = () => {
  const [allRestaurants, setAllRestaurants]           = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [searchText, setSearchText]                   = useState('')
  const [activeFilter, setActiveFilter]               = useState('all')
  const [activeCategory, setActiveCategory]           = useState(null)
  const [isLoading, setIsLoading]                     = useState(true)
  const [error, setError]                             = useState(null)
  const onlineStatus = useOnlineStatus()

  const RestaurantCardWithDiscount = withDiscountOffer(RestaurantCard)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res  = await fetch(
        'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9046136&lng=77.614948&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
      )
      const json = await res.json()
      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? []
      if (restaurants.length > 0) {
        setAllRestaurants(restaurants)
        setFilteredRestaurants(restaurants)
      } else {
        // Swiggy returned empty (CORS block, bot detection, different region) — use mock data
        setAllRestaurants(MOCK_RESTAURANTS)
        setFilteredRestaurants(MOCK_RESTAURANTS)
      }
    } catch {
      // Network error or JSON parse failure — use mock data silently
      setAllRestaurants(MOCK_RESTAURANTS)
      setFilteredRestaurants(MOCK_RESTAURANTS)
    } finally {
      setIsLoading(false)
    }
  }

  // Re-filter whenever search / filter chip / category changes
  useEffect(() => {
    setFilteredRestaurants(
      applyFilters(allRestaurants, activeFilter, activeCategory, searchText)
    )
  }, [searchText, activeFilter, activeCategory, allRestaurants])

  const handleCategoryClick = (label) => {
    setActiveCategory((prev) => (prev === label ? null : label))
  }

  const handleFilterClick = (id) => {
    setActiveFilter((prev) => (prev === id ? 'all' : id))
  }

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
              <button
                className="hero-search-clear"
                onClick={() => setSearchText('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="category-scroll-wrapper">
          <div className="category-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className={`category-pill ${activeCategory === cat.label ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.label)}
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
        {error ? (
          <div className="error-state">
            <span>⚠️</span>
            <p>{error}</p>
            <button onClick={fetchData}>Retry</button>
          </div>
        ) : isLoading ? (
          <Shimmer />
        ) : filteredRestaurants.length === 0 ? (
          <div className="empty-state">
            <span>🍽️</span>
            <h3>No restaurants found</h3>
            <p>Try a different search or clear your filters.</p>
            <button
              onClick={() => {
                setSearchText('')
                setActiveFilter('all')
                setActiveCategory(null)
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <h2 className="section-title">
              {activeCategory
                ? `${activeCategory} restaurants`
                : searchText
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
                  {restaurant.info.aggregatedDiscountInfoV3 ? (
                    <RestaurantCardWithDiscount resData={restaurant} />
                  ) : (
                    <RestaurantCard resData={restaurant} />
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Body
