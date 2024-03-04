import { useState, useEffect } from 'react';
import axios from "axios";

const useAxiosFetch = ( url, axiosInstance, skip = false) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        axiosInstance['cancelToken'] = source.token;

        const fetchData = async (url, axiosInstance, skip) => {
                setIsLoading(true);
                if(skip === true) {
                    setIsLoading(false);
                    return;
                }
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
                    isMounted && setTimeout(() => setIsLoading(false), 500);
                }
        }

        fetchData(url, axiosInstance, skip);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [url, axiosInstance, skip]);

    return { data, error, isLoading };
}

export default useAxiosFetch;