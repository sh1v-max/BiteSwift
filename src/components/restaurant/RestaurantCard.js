import { IMG_CDN_URL } from '../../utils/constants'
import '../../css/restaurantCard.css'

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=660&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=660&q=80',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=660&q=80',
]

const ratingColor = (rating) => {
  if (rating >= 4.3) return '#16a34a'  // green
  if (rating >= 3.8) return '#d97706'  // amber
  return '#dc2626'                      // red
}

const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId,
    name,
    avgRating,
    costForTwo,
    cuisines,
    areaName,
    sla,
    aggregatedDiscountInfoV3,
    veg,
  } = resData.info

  const deliveryTime = sla?.slaString ?? sla?.deliveryTime + ' mins' ?? '—'

  return (
    <div className="res-card">
      {/* Image */}
      <div className="res-card-img-wrap">
        <img
          className="res-card-img"
          src={cloudinaryImageId?.startsWith('http') ? cloudinaryImageId : IMG_CDN_URL + cloudinaryImageId}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)]
          }}
        />
        {/* Gradient overlay so text is readable if needed */}
        <div className="res-card-img-overlay" />

        {/* Discount badge on image */}
        {aggregatedDiscountInfoV3 && (
          <div className="res-discount-badge">
            {aggregatedDiscountInfoV3.header}
            {aggregatedDiscountInfoV3.subHeader
              ? ` ${aggregatedDiscountInfoV3.subHeader}`
              : ''}
          </div>
        )}

        {/* Veg indicator */}
        {veg && (
          <span className="res-veg-dot" title="Pure Veg">🥦</span>
        )}
      </div>

      {/* Info */}
      <div className="res-card-body">
        <h3 className="res-card-name">{name}</h3>

        <div className="res-card-meta">
          <span
            className="res-card-rating"
            style={{ background: ratingColor(avgRating) }}
          >
            ★ {avgRating}
          </span>
          <span className="res-card-dot">·</span>
          <span className="res-card-time">{deliveryTime}</span>
          <span className="res-card-dot">·</span>
          <span className="res-card-price">{costForTwo}</span>
        </div>

        <p className="res-card-cuisine">
          {cuisines?.slice(0, 3).join(', ')}
          {cuisines?.length > 3 ? ` +${cuisines.length - 3}` : ''}
        </p>

        <p className="res-card-area">📍 {areaName}</p>
      </div>
    </div>
  )
}

// HOC — wraps the card to inject a top banner for heavy discount offers
export const withDiscountOffer = (WrappedCard) => {
  return (props) => {
    const { aggregatedDiscountInfoV3 } = props.resData.info
    if (!aggregatedDiscountInfoV3) return <WrappedCard {...props} />

    return (
      <div className="res-card-hoc-wrap">
        <WrappedCard {...props} />
      </div>
    )
  }
}

export default RestaurantCard
