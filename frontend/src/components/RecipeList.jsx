import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ServingAdjuster } from './ServingAdjuster.jsx'

export function RecipeList({ recipes, favorites, ratings, onToggleFavorite, onRate }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
        No matching recipes yet. Add more ingredients or change filters.
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map(r => (
        <RecipeCard
          key={r.id}
          recipe={r}
          isFavorite={Boolean(favorites[r.id])}
          rating={ratings[r.id] || 0}
          onToggleFavorite={() => onToggleFavorite(r.id)}
          onRate={(stars) => onRate(r.id, stars)}
        />)
      )}
    </div>
  )
}

function RecipeCard({ recipe, isFavorite, rating, onToggleFavorite, onRate }) {
  const [servings, setServings] = useState(recipe.servings || 2)

  const nutritionPerServing = recipe.nutrition
  const scaledNutrition = {
    calories: Math.round(nutritionPerServing.calories * (servings / (recipe.servings || 2))),
    protein: +(nutritionPerServing.protein * (servings / (recipe.servings || 2))).toFixed(1),
    carbs: +(nutritionPerServing.carbs * (servings / (recipe.servings || 2))).toFixed(1),
    fat: +(nutritionPerServing.fat * (servings / (recipe.servings || 2))).toFixed(1),
  }

  return (
    <article className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug bg-gradient-to-r from-brand to-pink-600 bg-clip-text text-transparent">{recipe.title}</h3>
          <button className={`text-sm px-2 py-1 rounded-full ${isFavorite ? 'bg-yellow-100 border-yellow-300' : 'border'}`} onClick={onToggleFavorite}>
            {isFavorite ? '★ Favorite' : '☆ Favorite'}
          </button>
        </div>
        <p className="text-xs text-gray-600">{recipe.cuisine} • {recipe.difficulty} • {recipe.time} min</p>

        <div>
          <p className="text-sm font-medium">Matched Ingredients</p>
          <div className="text-xs text-gray-700 flex flex-wrap gap-1">
            {recipe.matchedIngredients?.map(m => (
              <span key={m} className="px-2 py-0.5 border rounded-full bg-gradient-to-r from-orange-100 to-rose-100">{m}</span>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-600">Score: {(recipe.score * 100).toFixed(0)}%</p>
        </div>

        <ServingAdjuster value={servings} onChange={setServings} />

        <div className="text-xs grid grid-cols-4 gap-2">
          <div className="p-2 bg-gray-50 rounded border">{scaledNutrition.calories} kcal</div>
          <div className="p-2 bg-gray-50 rounded border">P {scaledNutrition.protein}g</div>
          <div className="p-2 bg-gray-50 rounded border">C {scaledNutrition.carbs}g</div>
          <div className="p-2 bg-gray-50 rounded border">F {scaledNutrition.fat}g</div>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Steps</p>
          <ol className="list-decimal pl-5 text-sm space-y-1">
            {recipe.steps.slice(0, 4).map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <Link to={`/recipe/${recipe.id}`} className="inline-block mt-2 text-sm text-brand hover:text-brand-dark underline decoration-pink-400 decoration-2 underline-offset-4">View full recipe →</Link>
        </div>
      </div>
      <div className="border-t p-3 flex items-center justify-between">
        <StarRating rating={rating} onChange={onRate} />
        <div className="text-xs text-gray-600">Tags: {recipe.tags.join(', ')}</div>
      </div>
    </article>
  )
}

function StarRating({ rating, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange(n)} aria-label={`${n} stars`} className={n <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </button>
      ))}
    </div>
  )
}


