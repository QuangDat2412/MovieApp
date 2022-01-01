/* eslint-disable react-hooks/exhaustive-deps */
import './Info.scss';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Button from '../../components/button/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ListMovie from '../../components/listMovie/ListMovie';
import { getEpisodes } from '../../redux/episodeRedux/apiCalls';
import { updateUser } from '../../redux/authRedux/apiCalls';
import { useDispatch } from 'react-redux';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Movie() {
    const { slug } = useParams();
    const movie = useSelector((state) => {
        return state.movie.movies.find((movie) => movie.slug === slug);
    });
    const auth = useSelector((state) => {
        return state.auth.currentUser;
    });
    const dispatch = useDispatch();

    const [tabWrapper, setTabWrapper] = useState('1');

    useEffect(() => {
        getEpisodes(movie._id, dispatch);
        window.scrollTo(0, 0);
    }, [slug]);
    const episodes = useSelector((state) => {
        return state.episode.episodes;
    });
    const arrayEpisodes = [...episodes];
    arrayEpisodes.sort((a, b) => a.episode - b.episode);

    const handleTab = (e) => {
        setTabWrapper(e.target.dataset.foo);
    };

    return (
        <>
            <InfoMovie>
                <Banner>
                    <div>
                        <div>
                            <Link
                                to={`/watch/${slug}${movie.isSeries ? '-tap-1' : ''}-${movie.isSeries}`}
                                style={{ backgroundImage: `url(${movie.imgBanner})` }}
                            />
                            <div className="bottom"></div>
                            <div className="left"></div>
                        </div>
                        <div>
                            <Link
                                to={`/watch/${slug}${movie.isSeries ? '-tap-1' : ''}-${movie.isSeries}`}
                                style={{ backgroundImage: `url(${movie.imgBanner})` }}
                            />
                            <div className="bottom"></div>
                        </div>
                    </div>
                </Banner>
                <ContentInfo movie={movie} auth={auth} dispatch={dispatch} />
            </InfoMovie>
            <TabWrapper>
                <div>
                    {movie.isSeries && (
                        <div onClick={handleTab} data-foo="1" className={tabWrapper === '1' ? 'active' : ''}>
                            Chọn tập
                        </div>
                    )}
                    <div onClick={handleTab} data-foo="2" className={tabWrapper === '2' || !movie.isSeries ? 'active' : ''}>
                        Đề xuất cho bạn
                    </div>
                </div>
                <div></div>
                {tabWrapper === '1' && movie.isSeries ? (
                    <ListEpisode>
                        {arrayEpisodes.map((episode, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/watch/${movie.slug}-tap-${episode.episode}-${movie.isSeries}`} title={movie.title}>
                                        <div>
                                            <div style={{ backgroundImage: `url(${movie.imgBanner})` }} alt="" className="imgItem"></div>
                                        </div>
                                        <h3>{movie.title + ' Tập ' + episode.episode}</h3>
                                    </Link>
                                </div>
                            );
                        })}
                    </ListEpisode>
                ) : (
                    ''
                )}
                {tabWrapper === '2' || !movie.isSeries ? (
                    <div style={{ marginRight: `1rem` }}>
                        <ListMovie />{' '}
                    </div>
                ) : (
                    ''
                )}
            </TabWrapper>
        </>
    );
}

export const ContentInfo = (props) => {
    const dispatch = useDispatch();
    const { movie, auth, episode } = props;
    const [check, setCheck] = useState(true);
    const [checkLines, setCheckLines] = useState(0);
    useEffect(() => {
        const el = document.getElementById('desc');
        const divHeight = el.offsetHeight;
        setCheckLines(divHeight / 24);
    }, []);
    const handleMore = () => {
        if (check) {
            document.getElementById('descBox').classList.remove('desc');
            setCheck(false);
        } else {
            document.getElementById('descBox').classList.add('desc');
            setCheck(true);
        }
    };
    const handleAdd = () => {
        if (auth?._id) {
            updateUser(auth?._id, { favorites: [...auth?.favorites, movie._id] }, dispatch);
        }
    };
    const handleRemove = () => {
        if (auth?._id) {
            const data = auth?.favorites.map((e) => e);
            const index = data.indexOf(movie._id);
            if (index !== -1) {
                data.splice(index, 1);
            }
            updateUser(auth._id, { favorites: [...data] }, dispatch);
        }
    };
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
    return (
        <Content>
            <div>
                <div>
                    <h3>{movie.title}</h3>
                    {movie.isSeries && (
                        <>
                            <ChevronRightIcon />
                            <span>{`Tập ${episode?.episode}`}</span>
                        </>
                    )}
                </div>
                <h2>{movie.titleEng}</h2>
                {movie.isVip && (
                    <Vip>
                        <img src="https://img.icons8.com/dusk/64/000000/vip.png" alt="logo" />
                    </Vip>
                )}

                <Type className="mt10">
                    {movie.genre.map((genre, index) => {
                        return (
                            <Link to={'/genre/' + convertSlug(genre)} key={index}>
                                {genre}
                            </Link>
                        );
                    })}
                </Type>
                <Info>
                    <div className="mt10">
                        <span>
                            Năm phát hành: <Link to={'/year/' + movie.year}>{movie.year}</Link>
                        </span>
                    </div>
                    <div className="mt10">
                        <span>
                            Quốc gia: <Link to={'/country/' + convertSlug(movie.country)}>{movie.country}</Link>
                        </span>
                    </div>
                    <div className="mt10">
                        <span>
                            Đạo diễn:{' '}
                            {movie.director.map((director, index) => {
                                return <span key={index}>{`${director}, `}</span>;
                            })}
                        </span>
                    </div>
                    <div className="mt10">
                        <span>
                            Diễn viên:{' '}
                            {movie.actor.slice(0, 4).map((actor, index) => {
                                return <span key={index}>{`${actor}, `}</span>;
                            })}
                        </span>
                    </div>
                    <div className="mt10 desc" id="descBox">
                        <span>
                            Miêu tả: <span id="desc">{movie.desc}</span>
                        </span>
                    </div>
                    {checkLines >= 3 && (
                        <div className="mt10 more">
                            <span onClick={handleMore}>
                                {check ? 'Hiển thị thêm' : 'Thu gọn giới thiệu'}
                                {check ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                            </span>
                        </div>
                    )}
                </Info>
                <Buttons>
                    <Link to={`/watch/${movie.slug}${movie.isSeries ? '-tap-1' : ''}-${movie.isSeries}`}>
                        <Button>
                            <PlayArrowIcon style={{ marginRight: '10px' }} /> Phát ngay
                        </Button>
                    </Link>
                    {auth?.favorites.includes(movie._id) ? (
                        <Button onClick={handleRemove}>
                            <PlaylistAddCheckIcon style={{ marginRight: '10px' }} /> Huỷ lưu trữ
                        </Button>
                    ) : (
                        <Button onClick={handleAdd}>
                            <PlaylistAddIcon style={{ marginRight: '10px' }} /> Thêm vào lưu trữ
                        </Button>
                    )}
                </Buttons>
            </div>
        </Content>
    );
};
const InfoMovie = styled.div`
    margin-left: 4rem;
    @media screen and (max-width: 1023px) {
        margin-left: 0;
    }
    position: relative;
    a {
        cursor: pointer;
        &:hover {
            color: var(--primary-color);
        }
    }
`;
const Banner = styled.div`
    position: relative;
    z-index: 90;
    & > div {
        position: relative;
        &:before {
            content: '';
            display: block;
            padding-top: 39.8%;
        }
        & > div {
            position: absolute;
            opacity: 0.95;
            height: 100%;
            cursor: pointer;
            top: 0px;
            right: 0px;
            width: 70%;
            & > a {
                display: block;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: 100%;
            }
        }
        & > div:nth-child(2) {
            display: none;
            width: 100%;
        }
        @media screen and (max-width: 1023px) {
            & > div:nth-child(1) {
                display: none;
            }
            & > div:nth-child(2) {
                display: block;
            }
        }
    }
`;
const Content = styled.div`
    display: flex;
    width: 60%;
    font-size: 1rem;
    margin-top: -30%;
    & > div {
        & > div:nth-child(1) {
            display: flex;
            align-items: center;
            svg {
                font-size: 2rem;
                display: none;
            }
            span {
                font-size: 1.5rem;
                display: none;
            }
        }
        z-index: 99;
        h3,
        h2 {
            font-size: 2rem;
            text-align: left;
            font-weight: 700;
            overflow: hidden;
            text-transform: uppercase;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
            text-shadow: rgb(0 0 0 / 70%) 1px 1px 0px;
        }
        h2 {
            font-size: 1.3rem;
            font-weight: 500;
            color: #abb7c4;
            text-transform: none;
        }
        .mt10 {
            margin: 10px 0;
        }
    }
    @media screen and (max-width: 1023px) {
        margin-top: 0;
        width: 100%;
        padding: 0 4rem;
    }
`;
const Vip = styled.div`
    & > img {
        width: 40px;
        height: 40px;
    }
`;
const Type = styled.div`
    & > a {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 2px;
        font-weight: 600;
        padding: 2px 6px;
        margin-right: 10px;
        font-size: 0.75rem;
    }
`;
const Info = styled.div`
    a {
        color: var(--white);
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 1px;
    }
    span {
        color: rgb(169, 169, 172);
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 1px;
        span {
            color: var(--white);
        }
    }
    .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    #descBox {
        & > span {
            display: block;
            text-align: justify;
        }
    }
    .more {
        position: relative;
        span {
            position: absolute;
            right: 10px;
            color: var(--primary-color);
            display: flex;
        }
        cursor: pointer;
        &:hover {
            span {
                color: rgb(73, 210, 109);
            }
        }
    }
`;
const Buttons = styled.div`
    margin-top: 50px;
    display: flex;
    button {
        margin-right: 20px;
        display: inline-flex;
        background: rgb(45, 47, 52);
        text-align: center;
        &:hover {
            background: rgb(86, 87, 91);
        }
    }
    & > a:nth-child(1) {
        button {
            &:hover {
                background: rgb(73, 210, 109);
            }
            background-color: var(--primary-color);
        }
    }
`;
const TabWrapper = styled.div`
    margin: 2rem 3rem 2rem 4rem;
    & > div:nth-child(1) {
        display: flex;
        & > div {
            margin-right: 40px;
            padding: 16px 0;
            font-weight: 600;
            cursor: pointer;
        }
        .active {
            border-bottom: 4px solid rgb(28, 199, 73);
        }
    }
    & > div:nth-child(2) {
        opacity: 0.15;
        height: 1px;
        background-color: rgb(255, 255, 255);
        margin-right: 1rem;
    }
`;
const ListEpisode = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;

    & > div {
        width: 25%;
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
                    padding-top: 56.25%;
                    display: block;
                    height: 100%;
                    background-size: 100%;
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
