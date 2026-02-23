# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NourishUM is a React-based educational platform for University of Malaya (UM) students focused on sustainable diet and healthy eating habits. The application is a single-page application (SPA) built with React 18, Vite, and Tailwind CSS v4.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173 or 5174 if 5173 is busy)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Firebase Deployment

```bash
# First time setup (login required)
firebase login
firebase init hosting  # Select existing project, set public dir to "dist", configure as SPA

# Deploy to Firebase Hosting
npm run build && firebase deploy
```

## Application Architecture

### Single-File Component Structure

The entire application is contained in `src/App.jsx` as a monolithic component. This is an intentional design choice for simplicity - all UI, state, and routing logic exists in one file.

**Key architectural patterns:**

1. **Client-side routing**: No react-router. Navigation handled via `currentPage` state switching between page views
   - Pages: `'home'`, `'login'`, `'signup'`, `'detail'`
   - State: `const [currentPage, setCurrentPage] = useState('home')`

2. **Sub-components as inline functions**: Three main view components defined within App:
   - `AuthView({ type })` - Handles login/signup forms
   - `ModuleDetailView({ module })` - Displays individual module content
   - `HomeView()` - Main landing page with module grid

3. **State management**: Simple useState hooks, no external state library
   - `currentPage` - Controls which view is rendered
   - `isMenuOpen` - Mobile menu toggle
   - `activeModule` - Currently selected educational module
   - `user` - Authentication state (null = guest, object = logged in)

4. **Mock data**: Educational modules are hardcoded in the `modules` array (lines 15-28)
   - 12 modules total: 10 video lessons + 2 quizzes
   - Each module has: id, title, description, time, type, image URL

### Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4, which has different setup than v3:

- **CSS import**: Uses `@import "tailwindcss"` in `src/index.css` (NOT `@tailwind` directives)
- **PostCSS plugin**: Requires `@tailwindcss/postcss` package (NOT `tailwindcss` directly)
- **Config file**: `tailwind.config.js` still exists but v4 uses different parsing

**Important**: When modifying Tailwind config, use the v4 syntax. The postcss.config.js must reference `'@tailwindcss/postcss'`.

### Design System

Brand colors (all defined inline, no theme config):
- Primary: `#D4E157` (lime green) - headers, CTAs
- Accent: `#7986CB` (indigo) - hero section
- Background: `#FFFFF0` (ivory), `#F0F4C3` (light lime)

### External Dependencies

- **lucide-react**: All icons (Menu, X, Clock, PlayCircle, etc.)
- **Unsplash**: Module images via direct URLs with `auto=format&fit=crop` params
- **placehold.co**: Quiz placeholder images

## Key Implementation Details

### Authentication Flow
Authentication is simulated (no backend). Login/signup forms call `handleLogin()` which sets a mock user object after 500ms timeout. No actual validation occurs.

### Module Navigation
Clicking a module card calls `openModule(module)` which:
1. Sets `activeModule` state to the clicked module
2. Changes `currentPage` to `'detail'`
3. Scrolls window to top

### Responsive Design
- Mobile menu: Hidden on desktop (`hidden md:flex`), hamburger icon on mobile
- Grid layouts: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` for module cards
- Breakpoints follow Tailwind defaults (sm: 640px, md: 768px, lg: 1024px)

## File Structure

```
src/
├── App.jsx       # Entire application (426 lines)
├── main.jsx      # React entry point
└── index.css     # Tailwind import

Root config files:
├── vite.config.js        # Vite + React plugin
├── tailwind.config.js    # Tailwind v4 config
├── postcss.config.js     # PostCSS with @tailwindcss/postcss
├── firebase.json         # Firebase Hosting config (dist/ as public)
└── .firebaseignore       # Firebase deployment exclusions
```

## Modifying the Application

When adding features:
- **New pages**: Add new case to the conditional render in `<main>` (line 377-381)
- **New modules**: Add objects to the `modules` array with matching structure
- **Styling changes**: Use Tailwind classes directly in JSX, or search/replace brand colors like `#D4E157`
- **Icons**: Import from `lucide-react` at top of App.jsx

The codebase intentionally avoids over-engineering. There's no routing library, no state management library, no API layer - just React hooks and inline data.
