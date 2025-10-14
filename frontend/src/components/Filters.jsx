import React from 'react'

export function Filters({ value, onChange }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-brand to-pink-600 bg-clip-text text-transparent">Filters</h2>
      <div className="space-y-2">
        <label className="block text-sm">Cooking Time</label>
        <select
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-brand/30"
          value={value.time}
          onChange={(e) => onChange({ ...value, time: e.target.value })}
        >
          <option value="any">Any</option>
          <option value=",30">Under 30 min</option>
          <option value="30-60">30-60 min</option>
          <option value=">60">Over 60 min</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Difficulty</label>
        <select
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-brand/30"
          value={value.difficulty}
          onChange={(e) => onChange({ ...value, difficulty: e.target.value })}
        >
          <option value="any">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  )
}


