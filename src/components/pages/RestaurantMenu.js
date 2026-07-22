import Shimmer from '../shared/Shimmer'
import { IMG_CDN_URL } from '../../utils/constants'
import { useParams } from 'react-router'
import useRestaurantMenu from '../../utils/useRestaurantMenu'
import { MdStarRate } from 'react-icons/md'
import RestaurantCategory from '../restaurant/RestaurantCategory'
import { useState } from 'react'
import '../../css/RestaurantMenu.css'

const ratingColor = (rating) => {
  if (rating >= 4.3) return 'var(--bs-success)'
  if (rating >= 3.8) return 'var(--bs-warn)'
  return 'var(--bs-danger)'
}

const RestaurantMenu = () => {
  const { resId } = useParams()
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

  return (
    <div className="restaurant-container">
      <div className="restaurant-header">
        <img
          src={cloudinaryImageId?.startsWith('http') ? cloudinaryImageId : IMG_CDN_URL + cloudinaryImageId}
          alt={name}
        />

        <div className="res-header-details">
          <h1>{name}</h1>
          <h3>{areaName}</h3>
          {cuisines?.length > 0 && (
            <p className="cuisines">{cuisines.join(', ')}</p>
          )}

          <div className="info">
            <span className="rating">
              <MdStarRate style={{ color: ratingColor(rating) }} />
              {rating} ({totalRatingsString || '1K+ ratings'})
            </span>
            {costForTwoMessage && <span>· {costForTwoMessage}</span>}
            {sla?.slaString && <span>· ⏳ {sla.slaString}</span>}
          </div>
        </div>
      </div>

      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
        />
      ))}
    </div>
  )
}

export default RestaurantMenu
