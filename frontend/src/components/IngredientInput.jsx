import React, { useMemo, useState } from 'react'
import { synonymsMap, baseIngredients } from '../data/synonyms.js'

export function IngredientInput({ value, onChange, dietaryPrefs, onDietaryChange }) {
  const [text, setText] = useState('')

  const suggestions = useMemo(() => baseIngredients, [])

  function normalize(raw) {
    const key = raw.trim().toLowerCase()
    return synonymsMap[key] || key
  }

  function addFromText() {
    if (!text.trim()) return
    const tokens = text.split(/,|\n|\t|;/).map(normalize).filter(Boolean)
    const next = Array.from(new Set([...(value || []), ...tokens]))
    onChange(next)
    setText('')
  }

  function addIngredient(ing) {
    const normalized = normalize(ing)
    if (!normalized) return
    if ((value || []).includes(normalized)) return
    onChange([...(value || []), normalized])
  }

  function removeIngredient(ing) {
    onChange((value || []).filter(i => i !== ing))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-brand to-pink-600 bg-clip-text text-transparent">Ingredients</h2>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-brand/30"
          placeholder="Type ingredients separated by commas (e.g., tomato, onion)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFromText() } }}
        />
        <button className="px-3 py-2 rounded bg-gradient-to-r from-brand to-pink-500 text-white shadow hover:shadow-md transition" onClick={addFromText}>Add</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(value || []).map(ing => (
          <span key={ing} className="inline-flex items-center gap-2 text-sm bg-gray-100 border rounded-full pl-3 pr-2 py-1">
            {ing}
            <button aria-label={`Remove ${ing}`} className="text-gray-500 hover:text-gray-800" onClick={() => removeIngredient(ing)}>×</button>
          </span>
        ))}
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Quick add</p>
        <div className="flex flex-wrap gap-2 max-h-36 overflow-auto">
          {suggestions.map(s => (
            <button key={s} className="text-sm px-2 py-1 border rounded hover:bg-gradient-to-r hover:from-orange-100 hover:to-rose-100" onClick={() => addIngredient(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={dietaryPrefs.vegetarian} onChange={(e) => onDietaryChange({ ...dietaryPrefs, vegetarian: e.target.checked })} />
          Vegetarian
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={dietaryPrefs.glutenFree} onChange={(e) => onDietaryChange({ ...dietaryPrefs, glutenFree: e.target.checked })} />
          Gluten-free
        </label>
      </div>
    </div>
  )
}


