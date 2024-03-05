import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosFetch from '../hooks/useAxiosFetch';
import theMovieDbInstance from '../api/themoviedb';
import Loader from "../Loader/Loader";
import css from './MovieReviews.module.css';

const MovieReviews = () => {

  const [reviewData, setReviewData] = useState([]);
  const { movieId } = useParams();
  
  const params = {
      language: 'en-US',
      include_adult: false,
      page: 1,
  }
  const searchParams = new URLSearchParams(params);
  
  const { data, error, isLoading } = useAxiosFetch(`/movie/${movieId}/reviews?${searchParams}`, theMovieDbInstance);
  
  useEffect(() => {
    if(data !== null){
      setReviewData(!data.results ? [] : data.results);
    }
  },[data])

  return (
    <div>
    {isLoading && <Loader />}
    {error && (<p className="error">{error}</p>)}

    {!isLoading && !error && 
      (reviewData.length ?
        (<ul className={css.reviewsList}>
        {reviewData.map(review => {
          return (<li key={review.id}><p className={css.reviewAuthor}>Author: {review.author}</p><p>{review.content}</p></li>)
        })}
        </ul>)
        : (<p className="info">We don&apos;t have any reviews for this movie.</p>)
      )
    }
    </div>
)

}

export default MovieReviews