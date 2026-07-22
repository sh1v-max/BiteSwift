import { MdStarRate } from 'react-icons/md'
import { IMG_CDN_URL } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { addItem } from '../../utils/cartSlice'

const ratingColor = (rating) => {
  if (rating >= 4.3) return 'var(--bs-success)'
  if (rating >= 3.8) return 'var(--bs-warn)'
  return 'var(--bs-danger)'
}

const ItemList = ({ items }) => {
  const dispatch = useDispatch()
  const handleAddItem = (item) => dispatch(addItem(item))

  return (
    <div className="menu-item-list">
      {items.map((item) => {
        const { id, name, price, defaultPrice, ratings, imageId, description } = item.card.info
        const rating = ratings?.aggregatedRating?.rating
        const ratingCount = ratings?.aggregatedRating?.ratingCountV2

        return (
          <div key={id} className="menu-items">
            <div className="left">
              <h2>{name}</h2>
              <h4>₹{(price ?? defaultPrice ?? 0) / 100}</h4>
              {description && <p>{description.slice(0, 140)}</p>}
              {rating && (
                <div className="rating">
                  <MdStarRate style={{ color: ratingColor(rating) }} />
                  <span>{rating}{ratingCount ? ` (${ratingCount})` : ''}</span>
                </div>
              )}
            </div>

            <div className="right">
              {imageId && (
                <img
                  src={imageId.startsWith('http') ? imageId : IMG_CDN_URL + imageId}
                  alt={name}
                />
              )}
              <button className="add-btn" onClick={() => handleAddItem(item)}>
                ADD
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ItemList
