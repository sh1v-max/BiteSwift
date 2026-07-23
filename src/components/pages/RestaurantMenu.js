import Shimmer from '../shared/Shimmer'
import { IMG_CDN_URL } from '../../utils/constants'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useRestaurantMenu from '../../utils/useRestaurantMenu'
import { MdStarRate } from 'react-icons/md'
import { FiArrowLeft, FiSearch, FiX } from 'react-icons/fi'
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
  const resInfo = useRestaurantMenu(resId)
  const [showIndex, setShowIndex] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [vegOnly, setVegOnly] = useState(false)
  const [bestsellerOnly, setBestsellerOnly] = useState(false)

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

  // ── Search / veg / bestseller filtering ─────────────────────────────
  const hasActiveFilters = searchText.trim() || vegOnly || bestsellerOnly

  const itemMatchesFilters = (item) => {
    const info = item?.card?.info
    if (!info) return false
    if (vegOnly && info.itemAttribute?.vegClassifier !== 'VEG') return false
    if (bestsellerOnly && !info.ribbon?.text) return false
    if (searchText.trim() && !info.name?.toLowerCase().includes(searchText.trim().toLowerCase())) return false
    return true
  }

  const filteredCategories = categories
    .map((category) => ({
      category,
      items: (category?.card?.card?.itemCards || []).filter(itemMatchesFilters),
    }))
    .filter(({ items }) => items.length > 0)

  return (
    <div className="restaurant-page">
      <div className="menu-breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{name}</span>
      </div>

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
        <div className="menu-toolbar">
          <div className="menu-search">
            <FiSearch size={16} />
            <input
              type="text"
              placeholder="Search for dishes"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button className="menu-search-clear" onClick={() => setSearchText('')} aria-label="Clear search">
                <FiX size={15} />
              </button>
            )}
          </div>

          <div className="menu-filter-chips">
            <button
              className={`menu-filter-chip ${vegOnly ? 'active' : ''}`}
              onClick={() => setVegOnly((v) => !v)}
            >
              <span className="veg-indicator veg-indicator--veg" />
              Veg only
            </button>
            <button
              className={`menu-filter-chip ${bestsellerOnly ? 'active' : ''}`}
              onClick={() => setBestsellerOnly((v) => !v)}
            >
              🔥 Bestseller
            </button>
          </div>
        </div>

        {hasActiveFilters ? (
          filteredCategories.length === 0 ? (
            <div className="menu-no-results">
              <span>🍽️</span>
              <p>No dishes match your filters.</p>
            </div>
          ) : (
            filteredCategories.map(({ category, items }) => (
              <RestaurantCategory
                key={category?.card?.card?.title}
                data={{ ...category.card.card, itemCards: items }}
                forceOpen
              />
            ))
          )
        ) : (
          categories.map((category, index) => (
            <RestaurantCategory
              key={category?.card?.card?.title}
              data={category?.card?.card}
              showItems={index === showIndex}
              setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default RestaurantMenu
