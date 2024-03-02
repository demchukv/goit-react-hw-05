import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosFetch from '../hooks/useAxiosFetch';
import theMovieDbInstance from '../api/themoviedb';

const MovieReviews = () => {

  const [reviewData, setReviewData] = useState({});
  const { movieId } = useParams();
  
  const params = {
      language: 'en-US',
      include_adult: false,
      page: 1,
  }
  const searchParams = new URLSearchParams(params);
  
  const { data, error, isLoading } = useAxiosFetch(`/movie/${movieId}/reviews?${searchParams}`, theMovieDbInstance);
  
  useEffect(() => {
      setReviewData(data.results);
  },[data])

  
  return (
    <div>
    {isLoading && <p>Loading data, please wait...</p>}
    {error && (<p className="error">{error}</p>)}

    {!isLoading && !error && 
      (reviewData.length ?
        reviewData.map(review => {
          return (<li key={review.id}><p>Author: {review.author}</p><p>{review.content}</p></li>)
        })
        : (<p className="error">We don't have any reviews for this movie.</p>)
      )
    }
    </div>
)

}

export default MovieReviews