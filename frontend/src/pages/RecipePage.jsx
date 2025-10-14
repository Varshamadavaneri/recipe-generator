import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadRecipes } from '../data/recipes.js'

export default function RecipePage() {
  const { id } = useParams()
  const recipes = useMemo(() => loadRecipes(), [])
  const recipe = recipes.find(r => r.id === id)

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-600">Recipe not found.</p>
        <Link to="/" className="text-brand hover:text-brand-dark">← Back to home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-full">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-brand hover:text-brand-dark">← Back</Link>
          <h1 className="text-xl font-semibold">{recipe.title}</h1>
          <div />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          <div className="aspect-video w-full bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center border rounded" />
          <div>
            <h2 className="text-lg font-semibold mb-2">Steps</h2>
            <ol className="list-decimal pl-5 space-y-2">
              {expandSteps(recipe).map((s, idx) => <li key={idx}>{s}</li>)}
            </ol>
          </div>
        </section>
        <aside className="space-y-4">
          <div className="bg-white border rounded p-4">
            <p className="text-sm text-gray-600 mb-2">{recipe.cuisine} • {recipe.difficulty} • {recipe.time} min</p>
            <h3 className="font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
            </ul>
          </div>
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Nutrition (per serving)</h3>
            <ul className="text-sm space-y-1">
              <li>Calories: {recipe.nutrition.calories} kcal</li>
              <li>Protein: {recipe.nutrition.protein} g</li>
              <li>Carbs: {recipe.nutrition.carbs} g</li>
              <li>Fat: {recipe.nutrition.fat} g</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}

function expandSteps(recipe) {
  // Expand concise steps into more granular actions for a more guided flow
  const base = recipe.steps
  const expanded = []
  const add = (s) => expanded.push(s)

  add('Read the full recipe once end-to-end and gather all tools.')
  add('Wash hands and sanitize your work surface.')
  add('Measure and prepare all ingredients (mise en place).')

  for (const step of base) {
    const s = step.toLowerCase()
    if (s.includes('boil pasta')) {
      add('Fill a large pot with water and bring it to a rolling boil.')
      add('Salt the water generously (it should taste like the sea).')
      add('Add pasta and cook until al dente, stirring occasionally.')
      add('Reserve a cup of pasta water, then drain pasta well.')
    } else if (s.includes('sauté') || s.includes('saute')) {
      add('Preheat a skillet over medium heat; add 1–2 tbsp oil or butter.')
      add('Add aromatics and sauté, stirring, until fragrant and lightly golden.')
    } else if (s.includes('stir-fry')) {
      add('Heat a wok/pan on high until very hot; add oil with high smoke point.')
      add('Add chopped vegetables; stir-fry quickly to keep them crisp-tender.')
      add('Season and toss continuously to coat evenly.')
    } else if (s.includes('bake')) {
      add('Preheat oven to the specified temperature.')
      add('Arrange items on a lined tray for even heat circulation.')
      add('Bake on middle rack, rotating once halfway if needed.')
    } else if (s.includes('grill')) {
      add('Preheat grill; clean and oil grates to prevent sticking.')
      add('Grill over direct heat for sear, then move to indirect to finish.')
    } else if (s.includes('combine') || s.includes('toss')) {
      add('Add components to a large bowl or the pan and toss to coat evenly.')
      add('Adjust seasoning with salt, pepper, and acids (lemon/vinegar).')
    } else {
      add(step)
    }
  }

  add('Taste and adjust seasoning to balance salt, acid, and fat.')
  add('Plate neatly and garnish thoughtfully (fresh herbs, olive oil, zest).')
  add('Serve immediately at the recommended temperature.')

  return expanded
}


