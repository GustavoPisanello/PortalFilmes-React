import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Home/>},
      {path: "/movies/:id", element: <MovieDetails/>}
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
