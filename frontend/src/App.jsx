import React, { useMemo, useState } from 'react'
import { IngredientInput } from './components/IngredientInput.jsx'
import { ImageClassifier } from './components/ImageClassifier.jsx'
import { Predictions } from './components/Predictions.jsx'
import { Filters } from './components/Filters.jsx'
import { RecipeList } from './components/RecipeList.jsx'
import { MealPlanner } from './components/MealPlanner.jsx'
import { ShoppingList } from './components/ShoppingList.jsx'
import { loadRecipes } from './data/recipes.js'
import { computeMatches } from './lib/matching.js'
import { useLocalPrefs } from './lib/storage.js'
import { computeRecommendations } from './lib/recommendations.js'
import { Recommendations } from './components/Recommendations.jsx'

export default function App() {
  const recipes = useMemo(() => loadRecipes(), [])

  const [ingredients, setIngredients] = useState([])
  const [predictions, setPredictions] = useState([])
  const [dietaryPrefs, setDietaryPrefs] = useState({ vegetarian: false, glutenFree: false })
  const [filters, setFilters] = useState({ time: 'any', difficulty: 'any' })
  const [mealPlan, setMealPlan] = useState({})
  const [activeTab, setActiveTab] = useState('discover')
  const { favorites, ratings, toggleFavorite, rateRecipe } = useLocalPrefs()

  const addToMealPlan = (day, meal, recipeId) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: recipeId
      }
    }))
  }

  const matched = useMemo(() => {
    return computeMatches(recipes, ingredients, dietaryPrefs)
  }, [recipes, ingredients, dietaryPrefs])

  const filtered = useMemo(() => {
    return matched.filter(r => {
      if (dietaryPrefs.vegetarian && !r.tags.includes('vegetarian')) return false
      if (dietaryPrefs.glutenFree && !r.tags.includes('gluten-free')) return false
      if (filters.time !== 'any' && r.timeCategory !== filters.time) return false
      if (filters.difficulty !== 'any' && r.difficulty !== filters.difficulty) return false
      return true
    })
  }, [matched, dietaryPrefs, filters])

  const recommended = useMemo(() => {
    return computeRecommendations(recipes, dietaryPrefs, favorites, ratings)
  }, [recipes, dietaryPrefs, favorites, ratings])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <header className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Culinary AI
                </h1>
                <p className="text-sm text-gray-400">Smart Recipe Discovery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                AI Engine Active
              </div>
              <a 
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25" 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
              >
                View Code
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Discover Recipes
            </span>
            <br />
            <span className="text-white">From Your Ingredients</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload photos or type ingredients to get personalized recipe recommendations powered by advanced AI
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2">
            <div className="flex gap-2">
              {[
                { id: 'discover', label: 'Discover Recipes', icon: '🔍' },
                { id: 'plan', label: 'Meal Planning', icon: '📅' },
                { id: 'shop', label: 'Shopping List', icon: '🛒' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'discover' && (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column - Input Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <IngredientInput
                  value={ingredients}
                  onChange={setIngredients}
                  dietaryPrefs={dietaryPrefs}
                  onDietaryChange={setDietaryPrefs}
                />
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <ImageClassifier 
                  onPredictions={setPredictions} 
                  onAddIngredient={(ing) => setIngredients((prev) => Array.from(new Set([...prev, ing])))} 
                />
              </div>
              
              {predictions.length > 0 && (
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                  <Predictions 
                    predictions={predictions} 
                    onAddIngredient={(ing) => setIngredients((prev) => Array.from(new Set([...prev, ing])))} 
                  />
                </div>
              )}
            </div>

            {/* Right Column - Filters and Results */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <Filters value={filters} onChange={setFilters} />
              </div>

              {recommended.length > 0 && (
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                  <Recommendations
                    recipes={recommended}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={(id) => Boolean(favorites[id])}
                    ratingFor={(id) => ratings[id]}
                    onRate={rateRecipe}
                  />
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <RecipeList
                  recipes={filtered}
                  favorites={favorites}
                  ratings={ratings}
                  onToggleFavorite={toggleFavorite}
                  onRate={rateRecipe}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="max-w-6xl mx-auto">
            <MealPlanner
              recipes={recipes}
              onAddToPlan={addToMealPlan}
              mealPlan={mealPlan}
            />
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="max-w-4xl mx-auto">
            <ShoppingList
              mealPlan={mealPlan}
              recipes={recipes}
            />
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">© {new Date().getFullYear()} Culinary AI</p>
                <p className="text-sm text-gray-400">Powered by Advanced AI & Machine Learning</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Built with React, TypeScript & AI APIs</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


