import { useState, useEffect } from 'react'
import useAxiosFetch from '../components/hooks/useAxiosFetch';
import theMovieDbInstance from '../components/api/themoviedb'
import MovieList from "../components/MovieList/MovieList"

const HomePage = () => {

    const [movies, setMovies] = useState([]);

    const params = {
        language: 'en-US',
        include_adult: false,
        page: 1,
    }
    const searchParams = new URLSearchParams(params);

    const { data, error, isLoading } = useAxiosFetch(`/trending/movie/day?${searchParams}`, theMovieDbInstance);

    useEffect(() => {
        setMovies(data.results);
    },[data])
  
    return (
    <>
        {isLoading && <p>Loading data, please wait...</p>}
        {error && (<p>{error}</p>)}
        {!isLoading && !error && (movies.length ? <MovieList movies={movies} /> : <p>No movies to display!</p>)}
    </>
  )
}

export default HomePage;