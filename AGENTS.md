# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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

## Firebase Authentication

The app now uses real Firebase Authentication with Email/Password sign-in.

- Firebase Web SDK is installed through the `firebase` dependency.
- Firebase initialization lives in `src/firebase.js`.
- Runtime config is read from Vite env vars:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
- `.env.example` documents the required variables.
- Local `.env` is intentionally gitignored and should not be committed.
- Firebase project currently used locally:
  - Project ID: `nourish-um`
  - Project number / sender ID: `510928869460`
  - Auth domain: `nourish-um.firebaseapp.com`

Authentication behavior:
- Signup uses `createUserWithEmailAndPassword` and stores the full name in Firebase Auth `displayName`.
- Login uses `signInWithEmailAndPassword`.
- Logout uses `signOut`.
- `onAuthStateChanged` drives the local `user` state and restores sessions after refresh.
- Course content is currently open to all visitors without login (auth gating temporarily disabled). Login/signup remain available in the header for optional account creation.

## Application Architecture

### Single-File Component Structure

The entire application is contained in `src/App.jsx` as a monolithic component. This is an intentional design choice for simplicity - all UI, state, and routing logic exists in one file.

**Key architectural patterns:**

1. **Client-side routing**: Uses `react-router-dom`
   - Routes: `/`, `/quiz`, `/resources`, `/login`, `/signup`, `/modules/:slug`
   - Module pages are slug-based and resolved from the hardcoded `modules` array.

2. **Sub-components as inline functions**: Main view components are defined within `AppContent`:
   - `AuthView({ type })` - Handles login/signup forms
   - `QuizView()` - External quiz links
   - `ResourcesView()` - Resource links
   - `ModuleDetailView()` - Displays individual module content based on route slug
   - `HomeView()` - Main landing page with module grid

3. **State management**: Simple useState hooks, no external state library
   - `isMenuOpen` - Mobile menu toggle
   - `user` - Firebase auth state (null = guest, object = logged in)
   - `authLoading` / `authError` - Login/signup UI state
   - `completedActions` - Per-module action-step completion state
   - `preQuizAnswers` - Saved pre-quiz answers used by the post-quiz

4. **Mock curriculum data**: Educational modules are hardcoded in the `modules` array inside `src/App.jsx`
   - 12 modules total
   - Modules 1-10: pre-quiz, objectives, video, visual guide, post-quiz, action steps
   - Module 11: pledge and certificate flow
   - Module 12: review/resources module, not displayed in the homepage module grid
   - Each module generally has: id, title, description, time, type, videoId/image, objectives, actionSteps, supplements, quiz

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
Authentication is real Firebase Email/Password auth. Login/signup forms call `handleAuthSubmit(e, type)`:
- Signup creates a Firebase Auth user and updates `displayName`.
- Login signs in with Firebase Auth.
- Auth state is observed with `onAuthStateChanged`.
- Logout calls Firebase `signOut`.

### Module Navigation
Clicking a module card calls `openModule(module)` which:
1. Navigates to `/modules/${module.slug}`
2. Scrolls window to top

All course modules, detail pages, and the quiz route are currently accessible without authentication.

### Quiz Flow
Modules 1-10 include embedded pre-quiz and post-quiz flows:
- Pre-quiz records the user's selections in `preQuizAnswers`.
- Submitted pre-quiz choices remain visible.
- Post-quiz reads saved pre-quiz answers and displays correct answers.
- Wrong pre-quiz selections are marked red; correct answers are marked green.

### Visual Guides
Visual guide files are served from `public/new_supplements` and `public/supplements`.

Recent resource notes:
- Module 6 includes `Module_6_nutrition_month_veg_split.pdf` and `VF serving.pdf`.
- Module 7 includes `Module_7_nutrition_month_grains_split.pdf` and `Staple food serving.pdf`.
- Module 8 uses `M8 protein.pdf` and `Protein food serving.pdf`.
- Some visual guides display a `Source:` label via the optional `source` property on supplement entries.

### Responsive Design
- Mobile menu: Hidden on desktop (`hidden md:flex`), hamburger icon on mobile
- Grid layouts: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` for module cards
- Breakpoints follow Tailwind defaults (sm: 640px, md: 768px, lg: 1024px)

## File Structure

```
src/
├── App.jsx       # Main application, routes, module data, views, quiz UI
├── firebase.js   # Firebase app/auth initialization
├── main.jsx      # React entry point
└── index.css     # Tailwind import

Root config files:
├── vite.config.js        # Vite + React plugin
├── tailwind.config.js    # Tailwind v4 config
├── postcss.config.js     # PostCSS with @tailwindcss/postcss
├── firebase.json         # Firebase Hosting config (dist/ as public)
├── .firebaserc           # Default Firebase project (`nourish-um`)
├── .env.example          # Required Firebase Vite env vars
└── .firebaseignore       # Firebase deployment exclusions
```

## Modifying the Application

When adding features:
- **New pages**: Add a new `Route` in the `<Routes>` block in `src/App.jsx`
- **New modules**: Add objects to the `modules` array with matching structure
- **Styling changes**: Use Tailwind classes directly in JSX, or search/replace brand colors like `#D4E157`
- **Icons**: Import from `lucide-react` at top of App.jsx
- **Auth changes**: Prefer Firebase Auth APIs in `src/App.jsx` and shared Firebase setup from `src/firebase.js`

The codebase intentionally avoids over-engineering. There is routing and Firebase Auth, but still no global state library or API layer; most behavior remains React hooks and inline data inside `src/App.jsx`.
