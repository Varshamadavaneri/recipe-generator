import React, { useState } from 'react'

export function MealPlanner({ recipes, onAddToPlan, mealPlan }) {
  const [selectedDay, setSelectedDay] = useState('monday')
  const [selectedMeal, setSelectedMeal] = useState('breakfast')
  const [selectedRecipe, setSelectedRecipe] = useState('')

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const meals = ['breakfast', 'lunch', 'dinner', 'snack']

  const handleAddToPlan = () => {
    if (selectedRecipe) {
      onAddToPlan(selectedDay, selectedMeal, selectedRecipe)
      setSelectedRecipe('')
    }
  }

  const getMealPlanForDay = (day) => {
    return mealPlan[day] || {}
  }

  const getRecipeById = (id) => {
    return recipes.find(r => r.id === id)
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl shadow-lg border border-emerald-200 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Weekly Meal Planner
        </h2>
      </div>

      {/* Add Recipe to Plan */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 space-y-4">
        <h3 className="font-semibold text-gray-800">Add Recipe to Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-3 py-2 border border-emerald-300 rounded-lg bg-white text-gray-800"
          >
            {days.map(day => (
              <option key={day} value={day} className="capitalize">
                {day}
              </option>
            ))}
          </select>
          
          <select
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
            className="px-3 py-2 border border-emerald-300 rounded-lg bg-white text-gray-800"
          >
            {meals.map(meal => (
              <option key={meal} value={meal} className="capitalize">
                {meal}
              </option>
            ))}
          </select>
          
          <select
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}
            className="px-3 py-2 border border-emerald-300 rounded-lg bg-white text-gray-800"
          >
            <option value="">Select Recipe</option>
            {recipes.map(recipe => (
              <option key={recipe.id} value={recipe.id}>
                {recipe.title}
              </option>
            ))}
          </select>
          
          <button
            onClick={handleAddToPlan}
            disabled={!selectedRecipe}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Plan
          </button>
        </div>
      </div>

      {/* Weekly Calendar View */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-4">This Week's Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {days.map(day => {
            const dayPlan = getMealPlanForDay(day)
            return (
              <div key={day} className="bg-white/50 rounded-lg p-3 border border-emerald-200">
                <h4 className="font-medium text-gray-800 capitalize mb-2">{day}</h4>
                <div className="space-y-1">
                  {meals.map(meal => {
                    const recipeId = dayPlan[meal]
                    const recipe = recipeId ? getRecipeById(recipeId) : null
                    return (
                      <div key={meal} className="text-xs">
                        <span className="text-gray-600 capitalize">{meal}:</span>
                        {recipe ? (
                          <div className="text-gray-800 font-medium truncate" title={recipe.title}>
                            {recipe.title}
                          </div>
                        ) : (
                          <div className="text-gray-400">-</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
