import { useState, useEffect } from 'react'
import useAxiosFetch from '../components/hooks/useAxiosFetch';
import prepareUrl from '../components/api/themoviedb'
import MovieList from "../components/MovieList/MovieList"

const HomePage = () => {

    const [movies, setMovies] = useState([]);

    const searchParams = {
        language: 'en-US',
        include_adult: false,
        page: 1,
    }
    const fetchUrlData = prepareUrl('/trending/movie/day', searchParams);

    const { data, error, isLoading } = useAxiosFetch(fetchUrlData);

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