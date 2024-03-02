import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './App.css'
import Navigation from './components/Navigation/Navigation.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const MoviesPage = lazy(() => import('./pages/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage.jsx'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

function App() {
  
  return (
    <>
      <Navigation />

      <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
          <Route path='cast' element={<MovieCast />} />
          <Route path='reviews' element={<MovieReviews />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </>
  )
}

export default App
