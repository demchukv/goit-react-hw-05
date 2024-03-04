import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import css from './SearchBar.module.css';

const SearchBar = ({ handleSearch }) => {

    const [ searchParams ] = useSearchParams();
    const query = searchParams.get("query");
    const [value, setValue] = useState(query ? query : "");
    const searchBtn = useRef();
    
    const checkValue = (event) => {
        const inpuValue = event.target.value.trim();
        setValue(inpuValue);
    }

    useEffect(() => {
        searchBtn.current.disabled = value === "" ? true : false;
    }, [value])


  return (
    <form onSubmit={handleSearch} className={css.searchForm}>
    <input
      className={css.searchInput}
      type="text"
      name="query"
      value={value}
      onChange={checkValue}
    />
    <button className={css.searchBtn} type="submit" ref={searchBtn}><HiSearch /> Search</button>
    </form>
  )
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
}

export default SearchBar;