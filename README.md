Culinary AI - Smart Recipe Discovery Platform

A modern React application that revolutionizes recipe discovery through advanced AI-powered ingredient recognition and intelligent matching algorithms. It features a sleek dark theme UI with glassmorphism design, comprehensive meal planning, and automated shopping list generation — all optimized for performance and accessibility.

🌐 Live Demo: https://sparkly-snickerdoodle-b3abc3.netlify.app/

Tech Stack

Frontend: React 18 + Vite

Styling: TailwindCSS with custom gradients

Matching Engine: Fuse.js for fuzzy search and ingredient matching

Networking: Axios for API integration

AI Simulation: Advanced ingredient recognition and confidence scoring

TypeScript-ready architecture

Core Features

AI-Powered Ingredient Recognition: Classifies ingredients from uploaded images with confidence scoring

Fuzzy Recipe Matching: Suggests recipes based on available ingredients with substitution support

Meal Planning System: Intuitive drag-and-drop weekly meal planner

Smart Shopping Lists: Automatically generates categorized shopping lists from selected meals

Global Cuisine Database: Includes 25+ authentic recipes from 15+ countries

Advanced Filtering: Multi-criteria filtering (dietary, cuisine, preparation time, difficulty)

User Preferences: Save favorites, add ratings, and receive personalized suggestions

Responsive Design: Fully mobile-first layout with elegant glassmorphism effects

Getting Started
cd frontend
npm install
npm run dev


Visit http://localhost:5173
 to explore the application locally.

Build & Deploy
npm run build
npm run preview


Deployment (Netlify):

Build command: npm run build

Publish directory: dist

Environment: Node.js 18+

Live Deployment: https://sparkly-snickerdoodle-b3abc3.netlify.app/

Project Architecture
src/
├── components/
│   ├── ImageClassifier.jsx    # AI-powered image recognition
│   ├── MealPlanner.jsx        # Weekly meal planning system
│   ├── ShoppingList.jsx       # Smart shopping list generator
│   ├── RecipeList.jsx         # Recipe display with advanced filtering
│   └── ...
├── data/
│   ├── recipes.json           # Global cuisine database (25+ recipes)
│   └── synonyms.js            # Ingredient substitutions
├── lib/
│   ├── matching.js            # Fuzzy matching algorithm
│   ├── recommendations.js     # AI-powered recommendations
│   └── storage.js             # Local storage management
└── App.jsx                    # Main application with tab navigation

Key Innovations

Fuzzy Matching Algorithm: Leverages Fuse.js for intelligent ingredient matching

Confidence Scoring: AI predictions include confidence levels and match explanations

Meal Planning Integration: Connects recipes seamlessly to the weekly planner

Smart Categorization: Automatically groups ingredients in shopping lists

Glassmorphism UI: Sleek, modern interface with soft transparency and blur effects

Technical Highlights

Advanced state management with React hooks

Mobile-first responsive layout

Performance-optimized using useMemo and lazy loading

Accessibility-first approach with semantic HTML

TypeScript-ready modular architecture
