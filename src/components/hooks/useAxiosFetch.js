import { useState, useEffect } from 'react';
import axios from "axios";

const useAxiosFetch = ( url, axiosInstance) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        axiosInstance['cancelToken'] = source.token;

        const fetchData = async (url, axiosInstance) => {
                setIsLoading(true);
                try {
                    const response = await axiosInstance.get(url);
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

        fetchData(url, axiosInstance);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [url, axiosInstance]);

    return { data, error, isLoading };
}

export default useAxiosFetch;