import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import RecipePage from './pages/RecipePage.jsx'
import './styles.css'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/recipe/:id', element: <RecipePage /> },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


