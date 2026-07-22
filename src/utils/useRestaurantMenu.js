import { useState, useEffect } from 'react'
import { MENU_API } from './constants'

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null)
  const [error, setError]     = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setError(false)
    setResInfo(null)
    try {
      const data = await fetch(MENU_API + resId)
      const json = await data.json()
      const parsed = json?.data
      // Swiggy sometimes responds with an empty body when bot-detection triggers
      if (parsed && parsed.cards?.length) {
        setResInfo(parsed)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
  }

  return { resInfo, error, retry: fetchData }
}

export default useRestaurantMenu
