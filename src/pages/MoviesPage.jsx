import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import useAxiosFetch from '../components/hooks/useAxiosFetch';
import theMovieDbInstance from '../components/api/themoviedb';
import MovieList from "../components/MovieList/MovieList";
import SearchBar from '../components/SearchBar/SearchBar';
import Loader from '../components/Loader/Loader';
/*import LoadMoreMovies from '../components/LoadMoreMoview/LoadMoreMovies';*/
import PaginateMoviesList from '../components/PaginateMoviesList/PaginateMoviesList';

const MoviesPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const { query } = params;
  
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  
  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const newQuery = form.elements.query.value.trim();
    if(newQuery === ""){
      return;
    }
    setSearchParams({ query: newQuery });
    form.reset;
  }
  
  const { data, error, isLoading } = useAxiosFetch(`/search/movie?${searchParams}&page=${page}&include_adult=false&language=en-US`, theMovieDbInstance, !query ?? true);

  useEffect(() => {
    if(data !== null){
      setMovies(!data.results ? [] : data.results);
    }
    },[data]
  );

  const loadSelectedPage = ({ selected: selectedPage }) => {
    setPage(parseInt(selectedPage + 1));
  }

  return (
    <>
    <SearchBar value={query} handleSearch={handleSearch} />
    {isLoading && <Loader />}
    {error && (<p className="error">{error}</p>)}
    {!error && !isLoading && 
      (movies.length > 0 && 
        <>
          <MovieList movies={movies} />
          {data.total_pages > 1 && <PaginateMoviesList onClick={loadSelectedPage} pageCount={data.total_pages} forcePage={page} />}
        </>)
    }
    </>
  )
}

export default MoviesPage;