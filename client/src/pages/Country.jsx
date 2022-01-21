/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import BannerSlide from '../components/BannerSlide';
import { useParams } from 'react-router-dom';
import useFetchData from '../hook/useFetchData';
import ListEpisode from '../components/ListEpisode.jsx';
const Country = (props) => {
    const { slug } = useParams();
    const { setOpenModal } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);
    const { listMovies, key } = useFetchData('movies/country-', slug);
    const string = key ? 'Phim ' + key : '';
    return (
        <div>
            <BannerSlide movies={listMovies} setOpenModal={setOpenModal} s />
            <ListEpisode movies={listMovies} string={string} />
        </div>
    );
};

export default Country;
