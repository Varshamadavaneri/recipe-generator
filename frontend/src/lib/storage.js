import { useEffect, useMemo, useState } from 'react'

const FAVORITES_KEY = 'srg:favorites'
const RATINGS_KEY = 'srg:ratings'

function getJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export function useLocalPrefs() {
  const [favorites, setFavorites] = useState({})
  const [ratings, setRatings] = useState({})

  useEffect(() => {
    setFavorites(getJSON(FAVORITES_KEY, {}))
    setRatings(getJSON(RATINGS_KEY, {}))
  }, [])

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
  }, [ratings])

  function toggleFavorite(id) {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function rateRecipe(id, stars) {
    setRatings(prev => ({ ...prev, [id]: stars }))
  }

  return { favorites, ratings, toggleFavorite, rateRecipe }
}


