import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { memo } from 'react';
import { Link } from 'react-router-dom';
const ListMovie = (props) => {
    const { movies } = props;
    let settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <ListMovieBox>
            <Carousel {...settings}>
                {movies.map((movie, index) => {
                    return <MovieItem key={index} movie={movie} />;
                })}
            </Carousel>
        </ListMovieBox>
    );
};
const MovieItem = (props) => {
    return (
        <>
            <MovieBox>
                <Link to={'/detail/' + props.movie?.slug} title={props.movie?.title}>
                    <div>
                        <div style={{ backgroundImage: `url(${props.movie?.imgTitle})` }} alt="" className="imgItem"></div>
                        {props.movie?.isVip && (
                            <Vip>
                                <img src="https://img.icons8.com/dusk/64/000000/vip.png" alt="logo" />
                            </Vip>
                        )}
                    </div>
                    <h3>{props.movie?.title}</h3>
                    <h2>{props.movie?.titleEng}</h2>
                </Link>
            </MovieBox>
        </>
    );
};
const MovieBox = styled.div`
    position: relative;
    margin: 0 0.5rem;
    & > a {
        & > div {
            overflow: hidden;
            margin-bottom: 1rem;
            border-radius: 6px;
            position: relative;
            & > div:nth-child(1) {
                width: 100%;
                object-fit: cover;
                transition: all 0.3s ease-in-out 0s;
                border-radius: 5px;
                background-repeat: no-repeat;
                background-size: cover;
                padding-top: 150%;
            }
        }
        & > h3,
        h2 {
            transition: all 0.3s ease-in-out 0s;
            font-size: 0.9rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        & > h2 {
            font-size: 0.7rem;
            color: #abb7c4;
            text-transform: none;
        }
    }
    &:hover .imgItem {
        transform: scale(1.1);
    }
    &:hover h3 {
        color: var(--primary-color);
    }
`;
const Vip = styled.div`
    position: absolute;
    top: 0px;
    right: 10px;
    & > img {
        width: 40px;
        height: 40px;
    }
`;

const Carousel = styled(Slider)`
    .slick-next,
    .slick-prev {
        height: 100%;
        opacity: 0;
        z-index: 1000;
        &:hover {
            opacity: 1;
        }
        &:before {
            font-size: 2rem;
        }
    }
    .slick-prev {
        left: -40px;
    }
    .slick-next {
        right: -40px;
    }
`;
const ListMovieBox = styled.div`
    margin: 3rem 0;
    & > h2 {
        margin: 0 0 16px 10px !important;
    }
`;
export default memo(ListMovie);
