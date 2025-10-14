import React from 'react'

export function Recommendations({ recipes, onToggleFavorite, isFavorite, ratingFor, onRate }) {
  if (!recipes || recipes.length === 0) return null
  const top = recipes.slice(0, 6)
  return (
    <section className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
      <h2 className="text-lg font-semibold">Recommended for You</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {top.map(r => (
          <div key={r.id} className="border rounded p-3 text-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium leading-snug">{r.title}</p>
                <p className="text-xs text-gray-600">{r.cuisine} • {r.difficulty} • {r.time} min</p>
              </div>
              <button className={`text-xs px-2 py-1 rounded ${isFavorite(r.id) ? 'bg-yellow-100 border-yellow-300' : 'border'}`} onClick={() => onToggleFavorite(r.id)}>
                {isFavorite(r.id) ? '★' : '☆'}
              </button>
            </div>
            {r.recommendationReasons?.length > 0 && (
              <p className="text-xs text-gray-600 mt-1">Because: {r.recommendationReasons.join(', ')}</p>
            )}
            <div className="mt-2 flex items-center gap-1">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => onRate(r.id, n)} aria-label={`${n} stars`} className={n <= (ratingFor(r.id) || 0) ? 'text-yellow-500' : 'text-gray-300'}>★</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


