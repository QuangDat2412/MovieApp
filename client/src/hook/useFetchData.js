/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
const useFetchData = (URL = '', slug = '') => {
    const getMovies = async () => {
        try {
            const res = await publicRequest.get(URL + slug);
            const data = { ...res.data };
            setListMovies(data[Object.keys(data)[0]]);
            setKey(Object.keys(data)[0]);
        } catch (err) {
            console.log(err);
        }
    };
    const [listMovies, setListMovies] = useState([]);
    const [key, setKey] = useState([]);

    useEffect(() => {
        getMovies();
    }, [slug]);
    return { listMovies, key };
};
export default useFetchData;
