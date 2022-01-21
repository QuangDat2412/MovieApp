/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import BannerSlide from '../components/BannerSlide';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import useFetchData from '../hook/useFetchData';

export default function Genre() {
    const { slug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);
    const { listMovies, genre } = useFetchData('movies/genre-', slug);
    return (
        <div>
            <BannerSlide movies={listMovies} />
            <div className="container">
                <h2 style={{ marginBottom: '10px' }}> {genre}</h2>
                <ListEpisode>
                    {listMovies.map((movie, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/detail/${movie?.slug}`} title={movie?.title}>
                                    <div>
                                        <div style={{ backgroundImage: `url(${movie?.imgTitle})` }} alt="" className="imgItem"></div>
                                    </div>
                                    <h3>{movie?.title}</h3>
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
