import { MdStarRate } from 'react-icons/md'
import { IMG_CDN_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, incrementQuantity, decrementQuantity } from '../../utils/cartSlice'

const ratingColor = (rating) => {
  if (rating >= 4.3) return 'var(--bs-success)'
  if (rating >= 3.8) return 'var(--bs-warn)'
  return 'var(--bs-danger)'
}

const ItemList = ({ items }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((store) => store.cart.items)

  const getQuantity = (id) => cartItems.find((c) => c.card.info.id === id)?.quantity || 0

  return (
    <div className="menu-item-list">
      {items.map((item) => {
        const { id, name, price, defaultPrice, ratings, imageId, description, itemAttribute, ribbon } = item.card.info
        const rating = ratings?.aggregatedRating?.rating
        const ratingCount = ratings?.aggregatedRating?.ratingCountV2
        const isVeg = itemAttribute?.vegClassifier === 'VEG'
        const quantity = getQuantity(id)

        return (
          <div key={id} className="menu-items">
            <div className="left">
              <div className="menu-item-name-row">
                <span
                  className={`veg-indicator ${isVeg ? 'veg-indicator--veg' : 'veg-indicator--nonveg'}`}
                  title={isVeg ? 'Veg' : 'Non-veg'}
                />
                <h2>{name}</h2>
                {ribbon?.text && <span className="menu-item-badge">{ribbon.text}</span>}
              </div>
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
              {quantity > 0 ? (
                <div className="qty-stepper">
                  <button onClick={() => dispatch(decrementQuantity(id))} aria-label="Decrease quantity">−</button>
                  <span>{quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(id))} aria-label="Increase quantity">+</button>
                </div>
              ) : (
                <button className="add-btn" onClick={() => dispatch(addItem(item))}>
                  ADD
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ItemList
