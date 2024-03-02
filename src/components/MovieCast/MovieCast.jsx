import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosFetch from '../hooks/useAxiosFetch';
import theMovieDbInstance from '../api/themoviedb'
import getImgUrl from '../api/theMovieDbImg';

const MovieCast = () => {

  const [castData, setCastData] = useState({});
  const { movieId } = useParams();
  
  const params = {
      language: 'en-US',
      include_adult: false
  }
  const searchParams = new URLSearchParams(params);
  
  const { data, error, isLoading } = useAxiosFetch(`/movie/${movieId}/credits?${searchParams}`, theMovieDbInstance);
  
  useEffect(() => {
      setCastData(data.cast);
  },[data])

  return (
      <div>
      {isLoading && <p>Loading data, please wait...</p>}
      {error && (<p className="error">{error}</p>)}

      {!isLoading && !error && 
        (castData.length ?
          castData.map(author => {
            return (<li key={author.credit_id}><img src={getImgUrl(author.profile_path)} alt={author.name} width="500"></img><p>{author.original_name}</p><p>Character: {author.character}</p></li>)
          })
          : (<p className="error">Data is empty!</p>)
        )
      }
      </div>
  )
}

export default MovieCast