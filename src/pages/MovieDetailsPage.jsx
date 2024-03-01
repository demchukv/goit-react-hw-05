import { Link, Outlet } from "react-router-dom";

const MovieDetailsPage = () => {
  return (
    <>
        <div>MovieDetailsPage</div>
        <p>Additional information</p>
        <ul>
            <li>
                <Link to="cast">Cast</Link>
            </li>
            <li>
                <Link to="reviws">Reviews</Link>
            </li>
        </ul>
        <Outlet />    
    </>
  )
}

export default MovieDetailsPage