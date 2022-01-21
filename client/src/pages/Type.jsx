/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import BannerSlide from '../components/BannerSlide';
import { useParams } from 'react-router-dom';
import useFetchData from '../hook/useFetchData';
import ListEpisode from '../components/ListEpisode.jsx';
const Type = (props) => {
    const { slug } = useParams();
    const { setOpenModal } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);
    const { listMovies } = useFetchData('movies/type-', slug);

    const string = slug === 'phim-bo' ? 'Phim Bộ' : 'Phim Lẻ';

    return (
        <div>
            <BannerSlide movies={listMovies} setOpenModal={setOpenModal} />
            <ListEpisode movies={listMovies} string={string} />
        </div>
    );
};

export default Type;
