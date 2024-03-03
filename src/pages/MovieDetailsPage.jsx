import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxiosFetch from '../components/hooks/useAxiosFetch';
import theMovieDbInstance from '../components/api/themoviedb';
import getImgUrl from '../components/api/theMovieDbImg';
import BackLink from '../components/BackLink/BackLink';

const MovieDetailsPage = () => {
    
    const [movieData, setMovieData] = useState({});
    const { movieId } = useParams();

    const location = useLocation();
    const backLinkHref = location.state?.from ?? "/";

    const params = {
        language: 'en-US',
        include_adult: false
    }
    const searchParams = new URLSearchParams(params);

    const { data, error, isLoading } = useAxiosFetch(`/movie/${movieId}?${searchParams}`, theMovieDbInstance);

    useEffect(() => {
        setMovieData(data);
    },[data])

    const vote = Math.floor(movieData.vote_average * 10);
    const date = new Date(movieData.release_date);
    const year = date.getFullYear();

  return (
    <>
        <BackLink to={backLinkHref}>Go back</BackLink>
        {isLoading && <p>Loading data, please wait...</p>}
        {error && (<p className="error">{error}</p>)}

        {!isLoading && !error && 
        (movieData.title ?
        (<div>
            <img src={getImgUrl(movieData.poster_path)} width="500" alt={movieData.title} />
            <h1>{movieData.title} ({year})</h1>
        <p>User Score: {vote}%</p>
        <h2>Overview</h2>
        {movieData.overview}
        <h2>Genres</h2>
        {movieData.genres && <p className="genres"> {movieData.genres.map(genre => {return (<span key={genre.id}>{genre.name}</span>)})}</p>}
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
        ) : <p className="error">No data to display</p>)}
    </>
  )
}

export default MovieDetailsPage