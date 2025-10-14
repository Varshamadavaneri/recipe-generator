import rawRecipes from './recipes.json'

function deriveTimeCategory(minutes) {
  if (minutes < 30) return ',30'
  if (minutes <= 60) return '30-60'
  return '>60'
}

export function loadRecipes() {
  return rawRecipes.map(r => ({
    ...r,
    timeCategory: deriveTimeCategory(r.time),
  }))
}


