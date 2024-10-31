import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Genres from './pages/Genres.jsx'
import MovieByGenre from './pages/MovieByGenre.jsx'
import Favorites from './pages/Favorites.jsx'
import Movies from './pages/Movies.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Home/>},
      {path: "/movies/:id", element: <MovieDetails/>},
      {path: "/genres", element: <Genres/>},
      {path: "/genres/:genero", element: <MovieByGenre/>},
      {path: "/favorites", element: <Favorites/>},
      {path: "/movies", element: <Movies/> }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router}/>
    </FavoritesProvider>
  </StrictMode>,
)
