import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMovies } from '../../redux/movieRedux/apiCalls';
import BannerSlide from '../../components/bannerSlide/BannerSlide';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function Country() {
    const { slug } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);
    const dispatch = useDispatch();
    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);
    const convertSlug = (str) => {
        // remove accents
        var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
            to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(RegExp(from[i], 'gi'), to[i]);
        }

        str = str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\\-]/g, '-')
            .replace(/-+/g, '-');

        return str;
    };
    const movies = useSelector((state) => {
        return state.movie.movies;
    });
    let country;
    const newMovies = movies.filter((m) => {
        const a = convertSlug(m.country);
        if (a === slug) {
            country = m.country;
        }
        return a === slug;
    });
    return (
        <div>
            <BannerSlide movies={newMovies} />
            <div className="container">
                <h2 style={{ marginBottom: '10px' }}> {country ? 'Phim ' + country : ''}</h2>
                <ListEpisode>
                    {newMovies.map((movie, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/info/${movie.slug}`} title={movie.title}>
                                    <div>
                                        <div style={{ backgroundImage: `url(${movie.imgTitle})` }} alt="" className="imgItem"></div>
                                    </div>
                                    <h3>{movie.title}</h3>
                                </Link>
                            </div>
                        );
                    })}
                </ListEpisode>
            </div>
        </div>
    );
}
const ListEpisode = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    margin-right: -1rem;

    & > div {
        width: 20%;
        margin-bottom: 1rem;
        & > a {
            & > div {
                overflow: hidden;
                margin-bottom: 1rem;
                margin-right: 1rem;
                & > div {
                    width: 100%;
                    object-fit: cover;
                    transition: all 0.3s ease-in-out 0s;
                    background-repeat: no-repeat;
                    padding-top: 150%;
                    display: block;
                    height: 100%;
                    background-size: 100%;
                    background-size: cover;
                }
            }
            & > h3 {
                transition: all 0.3s ease-in-out 0s;
                font-size: 0.9rem;
            }
        }
        &:hover .imgItem {
            transform: scale(1.1);
        }
        &:hover h3 {
            color: var(--primary-color);
        }
    }
`;
