import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies = [] }) => {

  const location = useLocation();

  return (
    <>
    {movies.length > 0 ?
    (<ul>
        {movies.map(movie =>{
            let year = movie.release_date ? new Date(movie.release_date).getFullYear() : '?';
            return (
            <li key={movie.id}>
                <Link to={{pathname: "/movies/"+movie.id}} state={{ from: location }}>{movie.title} ({year})</Link>
            </li>
            );
        })}
    </ul>) : <p className="info">No data to display</p>
    }
    </>
  )
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
}

export default MovieList;