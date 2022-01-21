/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Button from './Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { memo } from 'react';
import { convertSlug } from '../utils';
import AddVip from './AddVip';
const BannerSlide = (props) => {
    const { movies } = props;
    let settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
    };

    return (
        <Carousel {...settings}>
            {movies.map((movie, index) => {
                return (
                    <Wrap key={index}>
                        <div style={{ backgroundImage: `url(${movie?.imgBanner})` }}></div>
                        <WrapContent className="container">
                            <div>
                                <h2 className="title">{movie?.title}</h2>
                                <Type className="genre">
                                    {movie?.genre.map((genre, index) => {
                                        return (
                                            <Link to={'/genre/' + convertSlug(genre)} key={index}>
                                                {genre}
                                            </Link>
                                        );
                                    })}
                                </Type>
                                <p className="desc">{movie?.desc}</p>
                                <div className="boxBtn">
                                    <Link to={'/detail/' + movie?.slug} title={movie?.title}>
                                        <Button>
                                            <PlayArrowIcon />
                                        </Button>
                                    </Link>
                                    <AddVip movie={movie} setOpenModal={props.setOpenModal} />
                                </div>
                            </div>
                            <div>
                                <img src={movie?.imgTitle} alt="" className="w500" />
                            </div>
                        </WrapContent>
                    </Wrap>
                );
            })}
        </Carousel>
    );
};
const Type = styled.div`
    margin-top: 1.5rem !important ;
    & > a {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 2px;
        font-weight: 600;
        padding: 2px 6px;
        margin-right: 10px;
        font-size: 0.75rem;
    }
`;
const Carousel = styled(Slider)`
    width: 100%;
    overflow: hidden;
    @media screen and (max-width: 1023px) {
        .slick-prev,
        .slick-next {
            display: none !important;
        }
    }
    & div.slick-current {
        .w500 {
            transform: scale(1);
        }
        .title,
        .desc,
        .boxBtn,
        .genre {
            opacity: 1;
            transform: translateY(0);
        }
        .title {
            transition-delay: 0.3s, 0.3s;
        }
        .genre {
            transition-delay: 0.6s, 0.6s;
        }
        .desc {
            transition-delay: 1s, 1.5s;
        }
        .boxBtn {
            transition-delay: 1.2s, 1.5s;
        }
    }
    & > button {
        height: 100%;
        z-index: 1;
        height: 56px;
        width: 56px;
        top: 40%;
        &:before {
            font-size: 2rem;
        }
        &:hover {
            opacity: 1;
            transition: opacity 0.2s ease 0s;
        }
    }

    .slick-list {
        overflow: initial;
    }
    .slick-next,
    .slick-prev {
        height: 100%;
        opacity: 0;
        &:hover {
            opacity: 1;
        }
    }
    .slick-prev {
        left: -10px;
    }
    .slick-next {
        right: -10px;
    }
`;

const Wrap = styled.div`
    position: relative;
    & > div:nth-child(1) {
        position: relative;
        z-index: 1;
        width: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        padding-top: 56.25%;
        &:before,
        &:after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
        }
        &:before {
            top: 0;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        &:after {
            bottom: 0;
            height: 6rem;
            background-image: linear-gradient(to top, #111319, rgba(0, 0, 0, 0));
        }
    }
`;
const WrapContent = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    padding: 0 4rem;
    position: absolute;
    top: 10rem;
    z-index: 10;
    & > div:nth-child(2) {
        & img {
            width: 400px;
            border-radius: 30px;
            box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
            transform: scale(0);
            transition: transform 1.5s ease;
            height: 600px;
        }
    }
    & > div:nth-child(1) {
        width: 70%;
        padding-right: 10px;
        margin-top: 4rem;
        & > h2,
        & > p {
            font-size: 3.5rem;
            font-weight: 600;
            margin: 1rem 0;
            box-sizing: border-box;
            opacity: 0;
            transform: translateY(-70px);
            transition: transform 1.5s ease, opacity 1.5s ease;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
        & > div {
            box-sizing: border-box;
            margin-top: 3rem;
            transform: translateY(-100px);
            transition: transform 1.5s ease, opacity 1.5s ease;
            opacity: 0;
            button {
                border-radius: 50%;
                display: inline-flex;
                margin: 0 10px;
                &:hover {
                    background: rgb(73, 210, 109);
                }
                & > svg {
                    font-size: 2rem;
                    margin: 0 !important ;
                }
                background-color: var(--primary-color);
            }
            & > button:nth-child(2) {
                background-color: #bbb3b3;
            }
        }
        & > p {
            font-size: 1rem;
            font-weight: 700;
            -webkit-line-clamp: 3;
        }
        & > h2 {
            margin: 0;
        }
    }
    @media screen and (max-width: 1023px) {
        & > div:nth-child(2) {
            display: none;
        }
        & > div:nth-child(1) {
            width: 100%;
            padding: 0;
        }
    }
`;
export default memo(BannerSlide);
