import React from 'react'
import { synonymsMap } from '../data/synonyms.js'

export function Predictions({ predictions, onAddIngredient }) {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <p className="text-sm text-gray-500">No image predictions yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h2 className="text-lg font-semibold mb-2">Image Predictions</h2>
      <ul className="text-sm">
        {predictions.map((p, idx) => {
          const label = p.className
          const key = label.toLowerCase()
          const mapped = synonymsMap[key] || key
          return (
            <li key={idx} className="flex items-center justify-between py-1 border-b last:border-b-0">
              <button className="text-left hover:underline" onClick={() => onAddIngredient?.(mapped)}>{label} → {mapped}</button>
              <span className="text-gray-500">{(p.probability * 100).toFixed(1)}%</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


