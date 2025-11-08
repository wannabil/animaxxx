# Anime Search App

A modern, responsive anime search application built with React, TypeScript, and Redux. Search and explore anime using the Jikan API.

## 🚀 Live Demo

[Live URL will be added after deployment]

## ✨ Features

### Core Functionality
- **Instant Search**: Search triggers automatically with 250ms debouncing
- **Request Cancellation**: In-flight API requests are cancelled when new queries are typed
- **Server-side Pagination**: Browse through search results with proper pagination
- **Detailed Anime View**: Click any anime to see full details including synopsis, genres, studios, and more
- **Responsive Design**: Fully responsive UI that works on all devices

### Technical Highlights
- Built with **React 19** and **TypeScript** for type safety
- State management with **Redux Toolkit**
- Client-side routing with **React Router v6**
- Modern gradient UI design
- Clean, maintainable code structure

## 🛠️ Tech Stack

- **React 19.2.0** - UI library (Hooks only, no class components)
- **TypeScript 5.3.3** - Type safety
- **Redux Toolkit 2.0.1** - State management
- **React Router 6.21.1** - Navigation
- **Jikan API v4** - Anime data source (no authentication required)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🔧 Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd animaxxx
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will start on **http://localhost:4000**

## 📜 Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm start` - Start development server (default port)
- `npm run build` - Build for production
- `npm test` - Run tests

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── SearchPage.tsx      # Main search page with instant search
│   └── DetailPage.tsx      # Anime detail view
├── store/
│   ├── store.ts           # Redux store configuration
│   ├── animeSlice.ts      # Anime state management
│   └── hooks.ts           # Typed Redux hooks
├── services/
│   └── animeApi.ts        # API service with request cancellation
├── types/
│   └── anime.ts           # TypeScript interfaces
├── styles/
│   ├── SearchPage.css     # Search page styles
│   └── DetailPage.css     # Detail page styles
├── App.tsx                # Main app component with routing
└── index.tsx              # Application entry point
```

## 🎯 Key Implementation Details

### Instant Search with Debouncing
The search bar implements a 250ms debounce to minimize API calls while providing instant feedback:
- User input updates immediately
- API calls are debounced by 250ms
- Previous requests are cancelled when new queries are typed

### Request Cancellation
Uses AbortController to cancel in-flight requests:
- Prevents race conditions
- Reduces unnecessary network traffic
- Ensures latest query results are displayed

### State Management
Redux Toolkit manages all application state:
- Search results and query
- Current page and total pages
- Loading and error states
- Selected anime details

### Pagination
Server-side pagination with clean navigation:
- 20 results per page
- Previous/Next navigation
- Current page indicator
- Smooth scroll to top on page change

## 🌟 Bonus Implementation

### User Experience Enhancements
- **🔖 Save/Bookmark Functionality**: Save favorite anime with localStorage persistence
- **🎨 Dark Mode Toggle**: Switch between light and dark themes with persistent preference
- **🔍 Advanced Search Filters**: Filter by type, status, rating, and minimum score
- **Glass-morphism Design**: Modern frosted glass effect on all cards and components
- **Refined Color System**: Professional indigo and emerald color palette with CSS variables
- **Gradient Text Effects**: Beautiful gradient text for titles and headings
- **Loading States**: Animated spinners with theme-aware colors
- **Empty States**: Helpful messages when no results found
- **Smooth Animations**: Cubic-bezier easing for professional transitions
- **Hover Effects**: Glass effect with glow on hover
- **Mobile Responsive**: Optimized for all screen sizes
- **Error Handling**: Glass-styled error messages with subtle backgrounds

### Technical Excellence
- **Race Condition Prevention**: Request cancellation prevents outdated results
- **Custom React Hooks**: useLocalStorage for type-safe localStorage operations
- **Context API**: Theme management with React Context
- **TypeScript Best Practices**: Proper typing throughout, minimal use of `any`
- **Code Organization**: Logical folder structure with separation of concerns
- **React Best Practices**: Proper hook usage and efficient re-renders
- **localStorage Integration**: Persistent user preferences and saved anime
- **Clean Code**: Readable, consistent formatting

## 📱 Pages

### Search Page (`/`)
- Search bar with instant search
- Grid of anime cards with images, titles, scores, and episode counts
- Pagination controls
- Loading and empty states

### Detail Page (`/anime/:id`)
- Large anime image
- Full title (English, Japanese, and original)
- Metadata (score, type, episodes, status, aired dates, rating)
- Genres and studios
- Full synopsis
- Back button to return to search

## 🔗 API

This project uses the [Jikan API](https://jikan.moe/) - an unofficial MyAnimeList API:
- No authentication required
- RESTful JSON API
- Rate limited to 60 requests per minute
- Free and open source

## 🚢 Deployment

This app can be deployed to any static hosting platform:

### Recommended Platforms
1. **Netlify** (Recommended)
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

2. **Vercel**
   - Import project from GitHub
   - Framework preset: Create React App
   - Build command: `npm run build`

3. **GitHub Pages**
   - Add homepage to package.json
   - Deploy with gh-pages package

## ✅ Submission Checklist

- ✅ Uses npm only (no yarn/pnpm)
- ✅ `npm install` and `npm run dev` start the app successfully
- ✅ Dev server runs on port 4000
- ✅ No environment variables required
- ✅ All core functionality works as described
- ✅ Written in TypeScript
- ✅ Uses Redux for state management
- ✅ Instant search with 250ms debouncing
- ✅ Request cancellation for in-flight requests
- ✅ Server-side pagination
- ✅ Two-page structure (Search and Detail)
- ✅ React Router for navigation
- ✅ Responsive design
- ✅ Error handling

## 👨‍💻 Development Notes

- Built with Create React App
- Uses React 19.2 (with React 18 types for compatibility)
- Strict TypeScript configuration
- Modern CSS with Flexbox and Grid
- No external UI libraries (custom styling)

## 📄 License

MIT

---

Built with ❤️ using React, TypeScript, and Redux
