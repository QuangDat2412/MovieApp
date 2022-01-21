import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router';

export default function Search() {
    const { slug } = useParams();
    const location = useLocation();
    const data = location.state?.data ? location.state?.data : [];
    const value = location.state?.value ? location.state?.value : '';
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    return (
        <Container>
            <div className="container">
                <h2 style={{ marginBottom: '10px' }}> {'Từ khóa tìm kiếm: ' + value} </h2>
                <ListEpisode>
                    {data.map((movie, index) => {
                        return (
                            <div key={index}>
                                {' '}
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
        </Container>
    );
}
const Container = styled.div`
    margin-top: 100px;
`;
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
