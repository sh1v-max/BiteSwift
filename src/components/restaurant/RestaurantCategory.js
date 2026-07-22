import ItemList from './ItemList'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { RiArrowDownSLine } from 'react-icons/ri'

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  return (
    <div className="menu-category">
      <div className="menu-category-header" onClick={setShowIndex}>
        <span className="menu-category-title">
          {data?.title?.slice(0, 40)}
          <span className="menu-category-count">({data?.itemCards?.length})</span>
        </span>
        <span className="menu-category-arrow">
          {showItems ? <MdKeyboardArrowUp /> : <RiArrowDownSLine />}
        </span>
      </div>

      {showItems && <ItemList items={data?.itemCards} />}
    </div>
  )
}

export default RestaurantCategory
