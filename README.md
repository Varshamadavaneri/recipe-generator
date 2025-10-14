Culinary AI - Smart Recipe Discovery Platform
==============================================

A modern React application that revolutionizes recipe discovery through advanced AI-powered ingredient recognition and intelligent matching algorithms. Features a sleek dark theme UI with glassmorphism design, comprehensive meal planning, and automated shopping list generation.

Tech Stack
----------
- React 18 + Vite
- TypeScript-ready architecture
- TailwindCSS with custom gradients
- Fuse.js for fuzzy matching
- Axios for API integration
- Advanced AI simulation engine

Core Features
-------------
- **AI-Powered Ingredient Recognition**: Advanced image classification with confidence scoring
- **Fuzzy Recipe Matching**: Intelligent ingredient matching with substitution support
- **Meal Planning System**: Weekly meal planner with drag-and-drop functionality
- **Smart Shopping Lists**: Auto-generated categorized shopping lists from meal plans
- **Global Cuisine Database**: 25+ authentic recipes from 15+ countries
- **Advanced Filtering**: Multi-criteria filtering (dietary, time, difficulty, cuisine)
- **User Preferences**: Favorites, ratings, and personalized recommendations
- **Responsive Design**: Mobile-first design with dark theme and glassmorphism effects

Getting Started
---------------

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 to explore the application.

Build & Deploy
--------------
```bash
npm run build
npm run preview
```

Deploy to Vercel/Netlify:
- Build command: `npm run build`
- Publish directory: `dist`
- Environment: Node.js 18+

Project Architecture
--------------------
```
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
```

Key Innovations
---------------
- **Fuzzy Matching Algorithm**: Uses Fuse.js for intelligent ingredient matching
- **Confidence Scoring**: AI predictions include confidence levels and match details
- **Meal Planning Integration**: Seamless connection between recipes and meal planning
- **Smart Categorization**: Automatic ingredient categorization for shopping lists
- **Glassmorphism UI**: Modern design with backdrop blur and transparency effects

Technical Highlights
--------------------
- Advanced state management with React hooks
- Responsive design with mobile-first approach
- Performance optimized with useMemo and lazy loading
- Accessibility compliant with semantic HTML
- TypeScript-ready codebase structure


