import { useState, useEffect } from 'react';
import axios from "axios";

const useAxiosFetch = ({ url, options }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url, options) => {
                setIsLoading(true);
                try {
                    const response = await axios.get(url, { ...options, cancelToken: source.token });
                    if (isMounted) {
                        setData(response.data);
                        setError(null);
                    }
                }catch(err){
                    if (isMounted) {
                        setError(err.message);
                        setData([]);
                    }
                }finally{
                    isMounted && setTimeout(() => setIsLoading(false), 1000);
                }
        }

        fetchData(url, options);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [url, options]);

    return { data, error, isLoading };
}

export default useAxiosFetch;