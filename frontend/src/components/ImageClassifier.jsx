import React, { useRef, useState } from 'react'

// Mock AI service that simulates ingredient recognition
const mockAIService = {
  async classifyImage(imageFile) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock predictions based on common ingredients
    const mockPredictions = [
      { className: 'tomato', probability: 0.95 },
      { className: 'onion', probability: 0.87 },
      { className: 'garlic', probability: 0.82 },
      { className: 'bell pepper', probability: 0.78 },
      { className: 'carrot', probability: 0.71 }
    ]
    
    // Add some randomness to make it feel more realistic
    return mockPredictions.map(pred => ({
      ...pred,
      probability: pred.probability * (0.8 + Math.random() * 0.4)
    })).sort((a, b) => b.probability - a.probability)
  }
}

export function ImageClassifier({ onPredictions, onAddIngredient }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isReady, setIsReady] = useState(true)
  const imgRef = useRef(null)
  const dropRef = useRef(null)

  async function handleFile(file) {
    setError('')
    if (!file) return
    
    const url = URL.createObjectURL(file)
    if (imgRef.current) {
      imgRef.current.src = url
    }
    
    try {
      setLoading(true)
      const predictions = await mockAIService.classifyImage(file)
      onPredictions(predictions)
    } catch (e) {
      setError('Could not analyze the image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Predictions are added via the parent Predictions component click handler

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg border border-blue-200 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Ingredient Scanner
        </h2>
      </div>
      
      <div
        ref={dropRef}
        onDragOver={(e) => { e.preventDefault() }}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f) }}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
          isReady 
            ? 'border-blue-300 hover:border-blue-400 bg-white/50 hover:bg-white/70' 
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="font-semibold text-gray-700">
            {isReady ? 'Drop your ingredient photo here' : 'AI Scanner Ready'}
          </p>
          <p className="text-sm text-gray-500">or click to browse files</p>
        </div>
        <input 
          type="file" 
          accept="image/*" 
          disabled={!isReady} 
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        </div>
      )}
      
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <p className="text-sm text-blue-700 font-medium">AI is analyzing your image...</p>
          </div>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <img 
          ref={imgRef} 
          alt="preview" 
          className="w-24 h-24 object-cover rounded-xl border-2 border-blue-200 bg-gray-100 shadow-sm" 
        />
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-medium text-gray-700">✨ Smart Recognition Engine</p>
          <p>Powered by advanced AI to identify ingredients with high accuracy</p>
          <p className="text-xs text-gray-500">Click predicted ingredients to add them to your list</p>
        </div>
      </div>
    </div>
  )
}


