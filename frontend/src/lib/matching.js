import Fuse from 'fuse.js'
import { substitutions } from '../data/synonyms.js'

// Fuzzy matching configuration
const fuseOptions = {
  threshold: 0.4, // Lower threshold = more strict matching
  distance: 100,
  minMatchCharLength: 2,
  keys: ['name']
}

// Enhanced ingredient matching with fuzzy logic
function findBestMatch(userIngredient, availableIngredients) {
  const fuse = new Fuse(availableIngredients, fuseOptions)
  const results = fuse.search(userIngredient)
  
  if (results.length > 0 && results[0].score < 0.3) {
    return results[0].item
  }
  return null
}

function hasIngredient(owned, target, allIngredients) {
  const targetLower = target.toLowerCase()
  
  // Exact match
  if (owned.has(targetLower)) return { matched: true, confidence: 1.0, original: target }
  
  // Check substitutions
  const subs = substitutions[targetLower] || []
  for (const sub of subs) {
    if (owned.has(sub)) {
      return { matched: true, confidence: 0.9, original: target, substitution: sub }
    }
  }
  
  // Fuzzy matching
  const ownedArray = Array.from(owned)
  const bestMatch = findBestMatch(targetLower, ownedArray)
  if (bestMatch) {
    return { matched: true, confidence: 0.7, original: target, fuzzyMatch: bestMatch }
  }
  
  // Partial matching (contains)
  for (const ownedIng of owned) {
    if (targetLower.includes(ownedIng) || ownedIng.includes(targetLower)) {
      return { matched: true, confidence: 0.5, original: target, partialMatch: ownedIng }
    }
  }
  
  return { matched: false, confidence: 0.0, original: target }
}

export function computeMatches(recipes, inputIngredients, dietaryPrefs) {
  const owned = new Set((inputIngredients || []).map(s => s.toLowerCase()))
  const allIngredients = Array.from(owned)

  return recipes.map(r => {
    let totalScore = 0
    let matchedCount = 0
    const matchedList = []
    const matchDetails = []
    
    for (const ing of r.ingredients) {
      const match = hasIngredient(owned, ing, allIngredients)
      if (match.matched) {
        matchedCount += 1
        totalScore += match.confidence
        matchedList.push(ing)
        matchDetails.push(match)
      }
    }
    
    // Calculate composite score
    const ingredientMatchRatio = matchedCount / r.ingredients.length
    const confidenceScore = totalScore / r.ingredients.length
    const finalScore = (ingredientMatchRatio * 0.6) + (confidenceScore * 0.4)
    
    // Bonus for having more matched ingredients
    const bonusMultiplier = matchedCount > 3 ? 1.1 : 1.0
    
    return { 
      ...r, 
      score: finalScore * bonusMultiplier, 
      matchedIngredients: matchedList,
      matchDetails,
      confidence: confidenceScore,
      matchRatio: ingredientMatchRatio
    }
  }).sort((a, b) => b.score - a.score)
}



