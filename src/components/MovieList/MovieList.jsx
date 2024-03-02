import { Link } from "react-router-dom"

const MovieList = ({ movies }) => {
  return (
    <>
    <h1>Trending today</h1>
    <ul>
        {movies.map(movie =>{
            return (
            <li key={movie.id}>
                <Link to={{pathname: "/movies/"+movie.id}}>{movie.title}</Link>
            </li>
            );
        })}
    </ul>
    </>
  )
}

export default MovieList