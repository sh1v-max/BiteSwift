import ItemList from './ItemList'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { RiArrowDownSLine } from 'react-icons/ri'

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
            {isOpen ? <MdKeyboardArrowUp /> : <RiArrowDownSLine />}
          </span>
        )}
      </div>

      {isOpen && <ItemList items={data?.itemCards} />}
    </div>
  )
}

export default RestaurantCategory
