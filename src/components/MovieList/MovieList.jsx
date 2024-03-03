import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {

  const location = useLocation();

  return (
    <>
    {movies.length &&
    (<ul>
        {movies.map(movie =>{
            return (
            <li key={movie.id}>
                <Link to={{pathname: "/movies/"+movie.id}} state={{ from: location }}>{movie.title}</Link>
            </li>
            );
        })}
    </ul>)
    }
    </>
  )
}

export default MovieList;