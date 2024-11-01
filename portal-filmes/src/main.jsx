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
import MyList from './pages/MyList.jsx'
import Movies from './pages/Movies.jsx'
import { WatchLaterProvider } from './context/WatchLaterContext.jsx'
import { WatchedProvider } from './context/WatchedContext.jsx'
import PageNotFound from './pages/PageNotFound.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Home/>},
      {path: "/movies/:id", element: <MovieDetails/>},
      {path: "/genres", element: <Genres/>},
      {path: "/genres/:genero", element: <MovieByGenre/>},
      {path: "/MyList", element: <MyList/>},
      {path: "/movies", element: <Movies/> },
    ]
  },
  {
    path: "*",
    element: <PageNotFound/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <WatchLaterProvider>
        <WatchedProvider>
          <RouterProvider router={router}/>
        </WatchedProvider>
      </WatchLaterProvider>
    </FavoritesProvider>
  </StrictMode>,
)
