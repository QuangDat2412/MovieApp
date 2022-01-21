/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import VideoBox from '../components/videoBox/VideoBox';
import ListMovie from '../components/listMovie/ListMovie';
import { ContentInfo } from './Detail';
import { getMovies } from '../redux/movieRedux/apiCalls';

export default function Watch(props) {
    const dispatch = useDispatch();
    let { slug } = useParams();
    useEffect(() => {
        getMovies(dispatch);
        window.scrollTo(0, 0);
    }, [slug]);
    const arr = slug.split('-');
    Object.keys(arr).map((x) => {
        return (arr[x] = arr[x].trim());
    });
    const auth = useSelector((state) => {
        return state.auth.currentUser;
    });
    let newArr = [];
    if (arr[arr.length - 1] === 'true') {
        newArr = arr.slice(0, arr.length - 3);
    } else {
        newArr = arr.slice(0, arr.length - 1);
    }
    let newSlug = '';
    newArr.map((a, i) => {
        if (i === 0) {
            newSlug += a;
        } else {
            newSlug += '-' + a;
        }
        return 0;
    });
    const movies = useSelector((state) => {
        return state.movie.movies;
    });
    const movie = movies.find((movie) => movie?.slug === newSlug);
    const episodes = movie?.episodes;
    let episode;
    if (movie?.isSeries) {
        episode = episodes.find((episode) => `${episode.episode}` === arr[arr.length - 2]);
    } else {
        episode = episodes[0];
    }

    return (
        <>
            <Container>
                <VideoBox movie={movie} auth={auth} setOpenModal={props.setOpenModal} episode={episode} />
                <EpisodeRight movie={movie} episodes={episodes} episode={episode} movies={movies} />
                <div>
                    <ContentInfo movie={movie} episode={episode} />
                    <EpisodeRight movie={movie} episodes={episodes} episode={episode} movies={movies} />
                    <div>
                        <div></div>
                        <h2>Đề xuất liên quan</h2>
                        <ListMovie movies={movies} />
                    </div>
                </div>
            </Container>
        </>
    );
}

const EpisodeRight = (props) => {
    const { movie, movies, episodes, episode } = props;
    const [select, setSelect] = useState(true);
    const movies1 = movies.filter((m) => m.trending === 1);
    return (
        <EpisodeBox>
            <div>
                <div>
                    <div>
                        <Link to={`/detail/${movie?.slug}`} className="name">
                            {movie?.title}
                        </Link>
                    </div>
                    {movie?.isSeries ? (
                        <>
                            <div className="series">
                                <div
                                    style={{
                                        backgroundColor: `${select ? '#2d2f34' : '#23252b'}`,
                                        color: `${select ? 'var(--primary-color)' : ''}`,
                                        zIndex: `${select ? 21 : 20}`,
                                    }}
                                    onClick={() => {
                                        setSelect(true);
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${
                                                select
                                                    ? 'https://www.iqiyipic.com/lequ/20210524/playing_gif_green.gif'
                                                    : 'https://www.iqiyipic.com/lequ/20210524/playing_gif_gray.gif'
                                            })`,
                                        }}
                                    ></div>
                                    Chọn tập
                                    <div style={{ borderBottom: `calc(2.25rem - 2px) solid ${select ? '#2d2f34' : '#23252b'}` }}></div>
                                </div>
                                <div
                                    style={{
                                        backgroundColor: `${!select ? '#2d2f34' : '#23252b'}`,
                                        color: `${!select ? 'var(--primary-color)' : ''}`,
                                        zIndex: `${!select ? 21 : 20}`,
                                    }}
                                    onClick={() => {
                                        setSelect(false);
                                    }}
                                >
                                    Đề xuất
                                    <div style={{ borderBottom: ` calc(2.25rem - 2px) solid ${!select ? '#2d2f34' : '#23252b'}` }}></div>
                                </div>
                            </div>
                            {select ? (
                                <div className="episode">
                                    {episodes.map((e, index) => {
                                        return (
                                            <div key={index}>
                                                <div>
                                                    <Link
                                                        to={`/watch/${movie?.slug}-tap-${index + 1}-${movie?.isSeries}`}
                                                        style={{
                                                            color: `${`${episode.episode}` === `${index + 1}` ? 'var(--primary-color)' : ''}`,
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="trending">
                                    {movies1.map((movie, index) => {
                                        return (
                                            <div key={index}>
                                                <Link to={`/detail/${movie?.slug}`}>
                                                    <div style={{ backgroundImage: `url(${movie?.imgBanner})` }}></div>
                                                    <div>{movie?.title}</div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="notSeries">Đề xuất liên quan</div>
                            <div className="trending">
                                {movies.map((movie, index) => {
                                    return (
                                        <div key={index}>
                                            <Link to={`/detail/${movie?.slug}`}>
                                                <div style={{ backgroundImage: `url(${movie?.imgBanner})` }}></div>
                                                <div>{movie?.title}</div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </EpisodeBox>
    );
};
const Container = styled.div`
    margin-top: 70px;
    padding: 10px 4rem;
    display: flex;
    height: 100%;
    flex-wrap: wrap;

    & > div:nth-child(3) {
        margin-top: 2rem;
        width: 75%;
        & > div:nth-child(2) {
            display: none;
        }
        & > div:nth-child(3) {
            margin-top: 3rem;
            & > div:nth-child(1) {
                opacity: 0.15;
                height: 1px;
                background-color: rgb(255, 255, 255);
            }
            h2 {
                margin-top: 1rem;
            }
        }
        & > div:nth-child(1) {
            margin-top: 0;
            width: 100%;
            a:hover {
                color: var(--primary-color);
            }
            & > div {
                & > div:nth-child(1) {
                    span,
                    svg {
                        display: inline-block;
                    }
                }
                & > div:nth-child(6) {
                    display: none;
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        flex-direction: column;
        & > div:nth-child(2) {
            display: none;
        }
        & > div:nth-child(3) {
            width: 100%;
            & > div:nth-child(2) {
                margin-top: 2rem;
                display: block;
                .name {
                    display: none !important;
                }
            }
        }
    }
    @media screen and (max-width: 767px) {
        height: 50px;
    }
`;
const EpisodeBox = styled.div`
    width: 25%;
    background-color: rgb(26, 28, 34);
    & > div {
        width: 100%;
        position: relative;
        &:before {
            padding-top: 168.75%;
            content: '';
            display: block;
        }
        & > div {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            & > div:nth-child(1) {
                margin: 1.25rem;
                & > a {
                    line-height: 1.25;
                    font-size: 1.25rem;
                    color: var(--white);
                    text-align: left;
                    font-weight: 700;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            .notSeries {
                width: 100%;
                background-color: #2d2f34;
                padding: 1rem 0;
                font-size: 1rem;
                text-align: center;
                padding: 1rem 0;
                line-height: 1.25rem;
                cursor: pointer;
                border-radius: 5px;
            }
            .series {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                & > div:nth-child(1),
                & > div:nth-child(2) {
                    width: calc(50% - 7px);
                    font-size: 1rem;
                    text-align: center;
                    padding: 0.5rem 0;
                    position: relative;
                    line-height: 1.25rem;
                    cursor: pointer;
                    &:hover {
                        color: var(--primary-color);
                    }
                    & > div {
                        position: absolute;
                        content: '';
                        width: 0;
                        height: 0;
                        bottom: 0;
                    }
                }
                & > div:nth-child(1) {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    border-top-right-radius: 5px;
                    & > div:nth-child(1) {
                        width: 13px;
                        height: 11px;
                        display: inline-block;
                        position: relative;
                        margin-right: 5px;
                    }
                    &:hover {
                        & > div:nth-child(1) {
                            background-image: url('https://www.iqiyipic.com/lequ/20210524/playing_gif_green.gif') !important;
                        }
                    }
                    & > div:nth-child(2) {
                        border-right: 14px solid transparent;
                        right: -14px;
                    }
                }
                & > div:nth-child(2) {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border-top-left-radius: 5px;
                    & > div {
                        border-left: 14px solid transparent;
                        left: -14px;
                    }
                }
            }
            .episode {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                margin: 30px 0 10px 10px;
                & > div {
                    background-color: rgba(0, 0, 0, 0.3);
                    width: calc((100% - 60px) / 6);
                    border-radius: 5px;
                    position: relative;
                    margin: 0 10px 10px 0;
                    &:before {
                        padding-top: 100%;
                        content: '';
                        display: block;
                    }
                    & > div {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        a {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            text-align: center;
                            font-size: 0.8rem;
                            justify-content: center;
                            align-items: center;
                            &:hover {
                                color: var(--primary-color);
                            }
                        }
                    }
                }
            }
            .trending {
                overflow-y: scroll;
                overflow-x: hidden;
                height: 100%;
                margin: 1rem 0;
                &::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    background-color: #f5f5f5;
                    border-radius: 10px;
                }

                &::-webkit-scrollbar {
                    width: 5px;
                    background-color: #f5f5f5;
                    border-radius: 10px;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                    background-color: var(--primary-color);
                }
                & > div {
                    padding: 10px 0;
                    &:hover {
                        background-color: #2d2f34;
                        a {
                            & > div:nth-child(2) {
                                color: var(--primary-color);
                            }
                        }
                    }
                    a {
                        display: flex;
                        margin-left: 20px;
                        & > div:nth-child(1) {
                            padding-top: 22.5%;
                            background-repeat: no-repeat;
                            width: 40%;
                            border-radius: 5px;
                            margin: 0;
                            background-size: cover;
                            object-fit: cover;
                        }
                        & > div:nth-child(2) {
                            margin: 0 1rem;
                            width: 60%;
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            font-size: 0.8rem;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        width: 100%;
        & > div {
            &:before {
                padding-top: 0 !important;
            }
            & > div {
                position: relative;
            }
        }
        .trending {
            overflow-y: visible !important;
            a {
                & > div:nth-child(1) {
                    width: 10% !important;
                    padding-top: calc(56.25% * 0.1) !important;
                }
            }
        }
        .episode {
            & > div {
                width: calc((100% - 120px) / 12) !important;
            }
        }
    }
`;
