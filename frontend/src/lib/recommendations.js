export function computeRecommendations(recipes, dietaryPrefs, favorites, ratings) {
  const isDietOk = (r) => (
    (!dietaryPrefs?.vegetarian || r.tags.includes('vegetarian')) &&
    (!dietaryPrefs?.glutenFree || r.tags.includes('gluten-free'))
  )

  return recipes
    .filter(isDietOk)
    .map((r) => {
      const rating = ratings?.[r.id] || 0
      const isFav = !!favorites?.[r.id]
      // Score components
      const ratingScore = rating / 5 // 0..1
      const favBoost = isFav ? 0.25 : 0
      const dietBoost = (
        (dietaryPrefs?.vegetarian ? (r.tags.includes('vegetarian') ? 0.1 : 0) : 0) +
        (dietaryPrefs?.glutenFree ? (r.tags.includes('gluten-free') ? 0.1 : 0) : 0)
      )
      const score = Math.min(1, ratingScore + favBoost + dietBoost)

      const reasons = []
      if (isFav) reasons.push('favorite')
      if (rating >= 4) reasons.push(`${rating}★ rating`)
      if (dietaryPrefs?.vegetarian && r.tags.includes('vegetarian')) reasons.push('matches vegetarian')
      if (dietaryPrefs?.glutenFree && r.tags.includes('gluten-free')) reasons.push('matches gluten-free')

      return { ...r, recommendationScore: score, recommendationReasons: reasons }
    })
    .sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0))
}


