import ItemList from './ItemList'
import { ChevronUp, ChevronDown } from 'lucide-react'

const RestaurantCategory = ({ data, showItems, setShowIndex, forceOpen = false }) => {
  const isOpen = forceOpen || showItems

  return (
    <div className="menu-category">
      <div
        className={`menu-category-header ${forceOpen ? 'menu-category-header--static' : ''}`}
        onClick={forceOpen ? undefined : setShowIndex}
      >
        <span className="menu-category-title">
          {data?.title?.slice(0, 40)}
          <span className="menu-category-count">({data?.itemCards?.length})</span>
        </span>
        {!forceOpen && (
          <span className="menu-category-arrow">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        )}
      </div>

      {isOpen && <ItemList items={data?.itemCards} />}
    </div>
  )
}

export default RestaurantCategory
