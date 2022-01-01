import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import MovieItem from '../movieItem/MovieItem';
import styled from 'styled-components';
import { memo } from 'react';

const ListMovie = () => {
    const movies = useSelector((state) => state.movie.movies);
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
