/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import BannerSlide from '../components/BannerSlide';
import { useParams, useLocation } from 'react-router-dom';
import useFetchData from '../hook/useFetchData';
import ListEpisode from '../components/ListEpisode.jsx';
const Filter = (props) => {
    const { slug } = useParams();
    const { setOpenModal } = props;
    const location = useLocation();
    const arr = location.pathname.split('/');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);
    const { listMovies, key } = useFetchData('movies/' + arr[1] + '-', slug);
    let string = '';
    if (arr[1] === 'country') {
        string = key ? 'Phim ' + key : '';
    } else if (arr[1] === 'genre') {
        string = key;
    } else if (arr[1] === 'type') {
        string = slug === 'phim-bo' ? 'Phim Bộ' : 'Phim Lẻ';
    } else if (arr[1] === 'genre') {
        string = key ? 'Phim Năm ' + key : '';
    }
    return (
        <div>
            <BannerSlide movies={listMovies} setOpenModal={setOpenModal} s />
            <ListEpisode movies={listMovies} string={string} />
        </div>
    );
};

export default Filter;
