import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import RestaurantCard, { withDiscountOffer } from '../restaurant/RestaurantCard'
import Shimmer from '../shared/Shimmer'
import { CATEGORIES } from '../../utils/categories'
import '../../css/CollectionPage.css'
import '../../css/Body.css'

const COLLECTION_URL = '/.netlify/functions/swiggy-collection'

const extractRestaurants = (cards = []) => {
  for (const card of cards) {
    const grid = card?.card?.card?.gridElements?.infoWithStyle?.restaurants
    if (grid?.length) return grid
  }
  return cards
    .map((c) => c?.card?.card)
    .filter((c) => c?.info?.id)
    .map((c) => ({ info: c.info }))
}

const RestaurantCardWithDiscount = withDiscountOffer(RestaurantCard)

const CollectionPage = () => {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const category    = CATEGORIES.find((c) => c.slug === slug)

  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading]     = useState(true)

  useEffect(() => {
    if (!category) { navigate('/'); return }
    setRestaurants([])
    setIsLoading(true)
    fetchRestaurants()
  }, [slug])

  const fetchRestaurants = async () => {
    try {
      const res  = await fetch(
        `${COLLECTION_URL}?collection=${category.collection}&tags=${category.tags}&offset=0`
      )
      const json = await res.json()
      const list = extractRestaurants(json?.data?.cards ?? [])
      setRestaurants(list)
    } catch (e) {
      console.error('[CollectionPage] fetch error:', e.message)
    } finally {
      setIsLoading(false)
    }
  }

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
            <p>{restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} near you</p>
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
        )}
      </section>
    </div>
  )
}

export default CollectionPage
