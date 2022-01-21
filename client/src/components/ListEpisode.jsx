import React from 'react';
import styled from 'styled-components';
import { memo } from 'react';
import { Link } from 'react-router-dom';
const ListEpisode = (props) => {
    console.log(props);
    return (
        <div className="container">
            <h2 style={{ marginBottom: '10px' }}> {props.string}</h2>
            <ListEpisodeBox>
                {props.movies.map((movie, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/detail/${movie?.slug}`} title={movie?.title}>
                                <div>
                                    <div style={{ backgroundImage: `url(${movie?.imgTitle})` }} alt="" className="imgItem"></div>
                                    {movie?.isVip && (
                                        <Vip>
                                            <img src="https://img.icons8.com/dusk/64/000000/vip.png" alt="logo" />
                                        </Vip>
                                    )}
                                </div>
                                <h3>{movie?.title}</h3>
                            </Link>
                        </div>
                    );
                })}
            </ListEpisodeBox>
        </div>
    );
};
const Vip = styled.div`
    position: absolute;
    top: 0px;
    right: 10px;
    & > img {
        width: 40px;
        height: 40px;
    }
`;
const ListEpisodeBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    margin-right: -1rem;

    & > div {
        width: 20%;
        margin-bottom: 2rem;
        & > a {
            & > div {
                overflow: hidden;
                margin-bottom: 1rem;
                margin-right: 1rem;
                position: relative;
                & > div:nth-child(1) {
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
export default memo(ListEpisode);
