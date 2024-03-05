import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosFetch from '../hooks/useAxiosFetch';
import theMovieDbInstance from '../api/themoviedb'
import getImgUrl from '../api/theMovieDbImg';
import Loader from "../Loader/Loader";
import css from './MovieCast.module.css';

const MovieCast = () => {

  const [castData, setCastData] = useState([]);
  const { movieId } = useParams();
  
  const params = {
      language: 'en-US',
      include_adult: false
  }
  const searchParams = new URLSearchParams(params);
  
  const { data, error, isLoading } = useAxiosFetch(`/movie/${movieId}/credits?${searchParams}`, theMovieDbInstance);
  
  useEffect(() => {
    if(data !== null){
      setCastData(!data.cast ? [] : data.cast);
    }
  },[data])

  return (
      <>
      {isLoading && <Loader />}
      {error && (<p className="error">{error}</p>)}

      {!isLoading && !error && 
        (castData.length ?
          (<ul className={css.castList}>
          {castData.map(author => {
            return (<li className={css.castItem} key={author.credit_id}><img className={css.castPhoto} src={getImgUrl(author.profile_path)} alt={author.name} width="500"></img><div><p className={css.castName}>{author.original_name}</p><p>Character: {author.character}</p></div></li>)
          })}
          </ul>)
          : (<p className="error">Data is empty!</p>)
        )
      }
      </>
  )
}

export default MovieCast
