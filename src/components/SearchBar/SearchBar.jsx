import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';

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
    <div>
    <form onSubmit={handleSearch}>
    <input
      type="text"
      name="query"
      value={value}
      onChange={checkValue}
    />
    <button type="submit" ref={searchBtn}><HiSearch /> Search</button>
    </form>
  </div>
  )
}

export default SearchBar;