import { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
export default memo(MovieItem);
