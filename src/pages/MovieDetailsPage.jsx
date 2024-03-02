import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxiosFetch from '../components/hooks/useAxiosFetch';
import prepareUrl from '../components/api/themoviedb';

const MovieDetailsPage = () => {
    
    const [movieData, setMovieData] = useState({});
    const { movieId } = useParams();

    const searchParams = {
        language: 'en-US',
        include_adult: false
    }
    const fetchUrlData = prepareUrl(`/movie/${movieId}`, searchParams);

    const { data, error, isLoading } = useAxiosFetch(fetchUrlData);

    useEffect(() => {
        setMovieData(data);
    },[data])


  return (
    <>
        {isLoading && <p>Loading data, please wait...</p>}
        {error && (<p>{error}</p>)}

        {!isLoading && !error &&
        (<div>
            <h1>{movieData.title} ({movieData.release_date})</h1>
        <p>User Score: {movieData.vote_average}</p>
        <h2>Overview</h2>
        {movieData.overview}
        <h2>Genres</h2>
        <p>{movieData.length && movieData.genres.map(genre => {return (<span key={genre.id}>{genre.name}</span>)})}</p>
        <p>Additional information</p>
        <ul>
            <li>
                <Link to="cast">Cast</Link>
            </li>
            <li>
                <Link to="reviews">Reviews</Link>
            </li>
        </ul>
        <Outlet />    
        </div>
        )}
    </>
  )
}

export default MovieDetailsPage