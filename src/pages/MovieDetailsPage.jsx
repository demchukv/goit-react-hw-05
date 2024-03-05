import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxiosFetch from '../components/hooks/useAxiosFetch';
import theMovieDbInstance from '../components/api/themoviedb';
import getImgUrl from '../components/api/theMovieDbImg';
import BackLink from '../components/BackLink/BackLink';
import Loader from "../components/Loader/Loader";
import css from './MovieDetailsPage.module.css';

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
    const year = movieData.release_date ? new Date(movieData.release_date).getFullYear() : "?";

    
  return (
    <>
        {isLoading && <Loader />}
        {error && (<p className="error">{error}</p>)}

        {!isLoading && !error && 
        (movieData.title ?
        (<>
            <BackLink to={backLinkHref}>Go back</BackLink>
            <div className={css.movieBaseInfo}>
                <div className={css.moviePoster}>
                    <img src={getImgUrl(movieData.poster_path)} width="500" alt={movieData.title} className={css.movieImg} />
                </div>
                <div className={css.movieInfo}>
                    <h1 className={css.movieTitle}>{movieData.title} ({year})</h1>
                    <p>User Score: {vote}%</p>
                    <h2>Overview</h2>
                    {movieData.overview}
                    <h2>Genres</h2>
                    {movieData.genres && <p className="genres"> {movieData.genres.map(genre => {return (<span key={genre.id}>{genre.name}</span>)})}</p>}
                </div>
            </div>
            <h3>Additional information</h3>
            <ul>
                <li>
                    <Link to="cast" state={{ from: backLinkHref }} >Cast</Link>
                </li>
                <li>
                    <Link to="reviews" state={{ from: backLinkHref }}>Reviews</Link>
                </li>
            </ul>
            <Outlet />    
        </>
        ) : <p className="info">No data to display</p>)}
    </>
  )
}

export default MovieDetailsPage