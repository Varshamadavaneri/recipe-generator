import React, { useState, useMemo } from 'react'

export function ShoppingList({ mealPlan, recipes }) {
  const [checkedItems, setCheckedItems] = useState(new Set())

  const shoppingList = useMemo(() => {
    const ingredients = new Map()
    
    // Collect ingredients from meal plan
    Object.values(mealPlan).forEach(dayPlan => {
      Object.values(dayPlan).forEach(recipeId => {
        const recipe = recipes.find(r => r.id === recipeId)
        if (recipe) {
          recipe.ingredients.forEach(ingredient => {
            const normalizedIngredient = ingredient.toLowerCase()
            if (ingredients.has(normalizedIngredient)) {
              ingredients.set(normalizedIngredient, {
                name: ingredient,
                count: ingredients.get(normalizedIngredient).count + 1,
                recipes: [...ingredients.get(normalizedIngredient).recipes, recipe.title]
              })
            } else {
              ingredients.set(normalizedIngredient, {
                name: ingredient,
                count: 1,
                recipes: [recipe.title]
              })
            }
          })
        }
      })
    })

    return Array.from(ingredients.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [mealPlan, recipes])

  const toggleItem = (ingredient) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(ingredient)) {
      newChecked.delete(ingredient)
    } else {
      newChecked.add(ingredient)
    }
    setCheckedItems(newChecked)
  }

  const clearChecked = () => {
    setCheckedItems(new Set())
  }

  const getCategory = (ingredient) => {
    const name = ingredient.toLowerCase()
    if (name.includes('chicken') || name.includes('beef') || name.includes('pork') || name.includes('lamb') || name.includes('fish')) {
      return 'Meat & Seafood'
    }
    if (name.includes('milk') || name.includes('cheese') || name.includes('yogurt') || name.includes('butter')) {
      return 'Dairy'
    }
    if (name.includes('tomato') || name.includes('onion') || name.includes('garlic') || name.includes('pepper') || name.includes('carrot') || name.includes('broccoli')) {
      return 'Vegetables'
    }
    if (name.includes('rice') || name.includes('pasta') || name.includes('bread') || name.includes('flour')) {
      return 'Grains & Bread'
    }
    if (name.includes('oil') || name.includes('vinegar') || name.includes('soy sauce') || name.includes('spice')) {
      return 'Condiments & Spices'
    }
    return 'Other'
  }

  const groupedIngredients = useMemo(() => {
    const groups = {}
    shoppingList.forEach(ingredient => {
      const category = getCategory(ingredient.name)
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(ingredient)
    })
    return groups
  }, [shoppingList])

  if (shoppingList.length === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl shadow-lg border border-amber-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Shopping List
          </h2>
        </div>
        <p className="text-gray-600 text-center py-8">
          Add recipes to your meal plan to generate a shopping list
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl shadow-lg border border-amber-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Shopping List
          </h2>
        </div>
        <button
          onClick={clearChecked}
          className="text-sm px-3 py-1 bg-amber-200 text-amber-800 rounded-lg hover:bg-amber-300 transition-colors"
        >
          Clear Checked
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedIngredients).map(([category, ingredients]) => (
          <div key={category} className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              {category}
            </h3>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <label
                  key={`${ingredient.name}-${index}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.has(ingredient.name)}
                    onChange={() => toggleItem(ingredient.name)}
                    className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${checkedItems.has(ingredient.name) ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {ingredient.name}
                      </span>
                      {ingredient.count > 1 && (
                        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                          {ingredient.count}x
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      Used in: {ingredient.recipes.join(', ')}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {shoppingList.length} items total
          </span>
          <span className="text-gray-600">
            {checkedItems.size} checked
          </span>
        </div>
      </div>
    </div>
  )
}
