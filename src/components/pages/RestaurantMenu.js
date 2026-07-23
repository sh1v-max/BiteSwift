import Shimmer from '../shared/Shimmer'
import { IMG_CDN_URL } from '../../utils/constants'
import { useParams, useNavigate } from 'react-router-dom'
import useRestaurantMenu from '../../utils/useRestaurantMenu'
import { MdStarRate } from 'react-icons/md'
import { FiArrowLeft } from 'react-icons/fi'
import RestaurantCategory from '../restaurant/RestaurantCategory'
import { useState } from 'react'
import '../../css/RestaurantMenu.css'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80'

const ratingColor = (rating) => {
  if (rating >= 4.3) return 'var(--bs-success)'
  if (rating >= 3.8) return 'var(--bs-warn)'
  return 'var(--bs-danger)'
}

const RestaurantMenu = () => {
  const { resId } = useParams()
  const navigate = useNavigate()
  const { resInfo, error, retry } = useRestaurantMenu(resId)
  const [showIndex, setShowIndex] = useState(0)

  if (error) return (
    <div className="empty-state">
      <span>📡</span>
      <h3>Couldn't load this menu</h3>
      <p>Swiggy didn't return data for this restaurant. Please try again.</p>
      <button onClick={retry}>Retry</button>
    </div>
  )

  if (resInfo === null) return <Shimmer />

  const {
    cloudinaryImageId,
    name,
    areaName,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    sla,
  } = resInfo?.cards[2]?.card?.card?.info || {}

  const cards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || []

  const categories = cards.filter(
    (c) =>
      c?.card?.['card']?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  )

  const rating = avgRating ?? 3.8
  const heroImage = cloudinaryImageId?.startsWith('http') ? cloudinaryImageId : IMG_CDN_URL + cloudinaryImageId

  return (
    <div className="restaurant-page">
      <section className="menu-hero">
        <div className="menu-hero-media">
          <img
            src={heroImage}
            alt={name}
            onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE }}
          />
          <div className="menu-hero-scrim" />
        </div>

        <button
          className="menu-hero-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FiArrowLeft size={18} />
        </button>

        <div className="menu-hero-content">
          <h1>{name}</h1>
          {areaName && <p className="menu-hero-area">📍 {areaName}</p>}

          <div className="menu-hero-info">
            <span className="rating">
              <MdStarRate style={{ color: ratingColor(rating) }} />
              {rating} ({totalRatingsString || '1K+ ratings'})
            </span>
            {costForTwoMessage && <span>· {costForTwoMessage}</span>}
            {sla?.slaString && <span>· ⏳ {sla.slaString}</span>}
          </div>

          {cuisines?.length > 0 && (
            <p className="menu-hero-cuisines">{cuisines.join(', ')}</p>
          )}
        </div>
      </section>

      <div className="restaurant-container">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
          />
        ))}
      </div>
    </div>
  )
}

export default RestaurantMenu
