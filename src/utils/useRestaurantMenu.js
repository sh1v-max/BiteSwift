import { useState, useEffect } from 'react'
import { MENU_API } from './constants'
import { getMockMenu } from '../mocks/mockMenus'

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resId)
      const json = await data.json()
      const parsed = json?.data
      // Swiggy's menu API is reliably blocked by bot-detection outside a real
      // browser session — fall back to a mock menu so the page still works.
      if (parsed && parsed.cards?.length) {
        setResInfo(parsed)
      } else {
        setResInfo(getMockMenu(resId))
      }
    } catch {
      setResInfo(getMockMenu(resId))
    }
  }

  return resInfo
}

export default useRestaurantMenu
