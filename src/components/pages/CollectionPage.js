import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import RestaurantCard, { withDiscountOffer } from '../restaurant/RestaurantCard'
import Shimmer from '../shared/Shimmer'
import { CATEGORIES } from '../../utils/categories'
import '../../css/CollectionPage.css'
import '../../css/Body.css'

const COLLECTION_URL = '/.netlify/functions/swiggy-collection'

// Homepage listing: all restaurants inside one grid card
// Collection listing (type=rcv2): each restaurant is its own card with an `info` key
const extractRestaurants = (cards = []) => {
  // Try homepage-style first (gridElements.infoWithStyle.restaurants)
  for (const card of cards) {
    const grid = card?.card?.card?.gridElements?.infoWithStyle?.restaurants
    if (grid?.length) return grid
  }
  // Collection-style: pick every card that has info.id (restaurant card)
  return cards
    .map((c) => c?.card?.card)
    .filter((c) => c?.info?.id)
    .map((c) => ({ info: c.info }))
}

// Card 1 in collection responses carries the total restaurant count for this collection
const extractTotalCount = (cards = []) => {
  for (const card of cards) {
    const count = card?.card?.card?.restaurantCount
    if (count != null) return count
  }
  return null
}

const RestaurantCardWithDiscount = withDiscountOffer(RestaurantCard)

const CollectionPage = () => {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const category   = CATEGORIES.find((c) => c.slug === slug)

  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading]     = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [hasMore, setHasMore]         = useState(false)
  const [totalSeen, setTotalSeen]     = useState(0)
  const [collectionTotal, setCollectionTotal] = useState(null)

  const offsetRef    = useRef(0)
  const observerRef  = useRef(null)
  const loadMoreRef  = useRef(null)
  const fetchingRef  = useRef(false)

  // Redirect to home if slug doesn't match any category
  useEffect(() => {
    if (!category) { navigate('/') }
  }, [category, navigate])

  // Initial load
  useEffect(() => {
    if (!category) return
    offsetRef.current = 0
    setRestaurants([])
    setTotalSeen(0)
    setIsLoading(true)
    fetchBatch(0, true)
  }, [slug])

  const fetchBatch = async (offset, initial = false) => {
    if (!category) return
    try {
      const res  = await fetch(
        `${COLLECTION_URL}?collection=${category.collection}&tags=${category.tags}&offset=${offset}`
      )
      const json = await res.json()
      const cards = json?.data?.cards ?? []
      const batch = extractRestaurants(cards)
      console.log(`[BiteSwift] collection=${category.slug} offset=${offset} — got ${batch.length} restaurants`)

      if (initial) {
        const total = extractTotalCount(cards)
        if (total != null) setCollectionTotal(total)
      }

      if (batch.length > 0) {
        const nextOffset = offset + batch.length
        offsetRef.current = nextOffset
        setRestaurants((prev) => {
          if (initial) return batch
          const seen = new Set(prev.map((r) => r.info.id))
          return [...prev, ...batch.filter((r) => !seen.has(r.info.id))]
        })
        setTotalSeen((prev) => (initial ? batch.length : prev + batch.length))
        setHasMore(batch.length >= 6)
      } else {
        setHasMore(false)
      }
    } catch (e) {
      console.error('[CollectionPage] fetch error:', e.message)
      setHasMore(false)
    } finally {
      if (initial) setIsLoading(false)
    }
  }

  const loadMore = async () => {
    if (fetchingRef.current || !hasMore) return
    fetchingRef.current = true
    setIsFetchingMore(true)
    await fetchBatch(offsetRef.current)
    fetchingRef.current = false
    setIsFetchingMore(false)
  }

  loadMoreRef.current = loadMore

  const sentinelRef = useCallback((node) => {
    if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null }
    if (!node) return
    observerRef.current = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMoreRef.current() },
      { rootMargin: '0px' }
    )
    observerRef.current.observe(node)
  }, [])

  if (!category) return null

  return (
    <div className="collection-page">

      {/* Back */}
      <div className="collection-back-bar">
        <button className="collection-back-btn" onClick={() => navigate('/')}>
          ← Back
        </button>
      </div>

      {/* Header */}
      <div className="collection-header">
        <span className="collection-header-emoji">{category.emoji}</span>
        <div className="collection-header-text">
          <h1>{category.label} Restaurants</h1>
          {!isLoading && (
            <p>
              {collectionTotal != null
                ? `${totalSeen} of ${collectionTotal} restaurants`
                : `${totalSeen} restaurants loaded`}
              {hasMore ? ' — scroll for more' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Grid */}
      <section className="collection-restaurants">
        {isLoading ? (
          <Shimmer />
        ) : restaurants.length === 0 ? (
          <div className="empty-state">
            <span>{category.emoji}</span>
            <h3>No {category.label} restaurants found</h3>
            <p>Try a different category or check back later.</p>
            <button onClick={() => navigate('/')}>Back to home</button>
          </div>
        ) : (
          <>
            <div className="restaurant-grid">
              {restaurants.map((restaurant) => (
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
                  <span>Loading more {category.label.toLowerCase()} places…</span>
                </div>
              )}
              {!hasMore && restaurants.length > 0 && (
                <p className="end-of-list">
                  That's all {category.emoji} — all {collectionTotal ?? totalSeen} {category.label} restaurants
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default CollectionPage
