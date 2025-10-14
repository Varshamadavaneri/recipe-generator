import React from 'react'

export function ServingAdjuster({ value, onChange }) {
  function dec() { onChange(Math.max(1, value - 1)) }
  function inc() { onChange(value + 1) }
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Servings</span>
      <div className="inline-flex items-center border rounded overflow-hidden">
        <button className="px-2 py-1 hover:bg-gray-50" onClick={dec} aria-label="decrease">-</button>
        <span className="px-3 text-sm">{value}</span>
        <button className="px-2 py-1 hover:bg-gray-50" onClick={inc} aria-label="increase">+</button>
      </div>
    </div>
  )
}


