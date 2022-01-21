/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import '../../assets/css/style.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SearchBox from '../searchBox/SearchBox';
import { Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './topBar.scss';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authRedux/apiCalls';
import { Link } from 'react-router-dom';
import { convertSlug } from '../../utils';
import Stripe from '../stripe/Stripe';
export default function TopBar(props) {
    const timeId = useRef();
    const movies = useSelector((state) => state.movie?.movies);
    const [history, setHistory] = useState(JSON.parse(sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY)) || { history: [] });
    useEffect(() => {
        sessionStorage.setItem(process.env.REACT_APP_SESSION_KEY, JSON.stringify(history));
    }, [history]);

    const auth = useSelector((state) => state.auth.currentUser);

    const [select, setSelect] = useState(true);
    const { setOpenMobileModal, openMobileModal, openModal, setOpenModal } = props;
    window.addEventListener('scroll', () => {
        var scroll = window.scrollY;
        if (scroll >= 100) {
            document.getElementById('navBar')?.classList.add('navBar');
        } else {
            document.getElementById('navBar')?.classList.remove('navBar');
        }
    });
    const dispatch = useDispatch();

    const [openSearchBox, setOpenSearchBox] = useState(false);
    const handleOpenSearchBox = () => {
        setOpenSearchBox(!openSearchBox);
    };

    useEffect(() => {
        if (openModal || openMobileModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [openModal, openMobileModal]);
    const handleLogout = () => {
        logout(dispatch);
    };

    const genre = [
        'Phiêu Lưu',
        'Hành Động',
        'Kinh Dị',
        'Hài Hước',
        'Thần Thoại',
        'Khoa học',
        'Viễn Tưởng',
        'Tâm lý',
        'Hình sự',
        'Tình cảm',
        'Hoạt Hình',
        'Võ Thuật',
        'Chiến Tranh',
        'Cổ Trang',
    ];

    return (
        <>
            <NavBar id="navBar" className={openSearchBox ? 'navBar' : ''}>
                <div className="container" style={openSearchBox ? { justifyContent: 'center' } : {}}>
                    {!openSearchBox ? (
                        <>
                            <MobileMenu>
                                <MenuIcon
                                    onClick={() => {
                                        setOpenMobileModal(true);
                                    }}
                                />
                            </MobileMenu>
                            <Logo>
                                <Link to="/">
                                    <img src="https://img.icons8.com/bubbles/50/000000/duolingo-logo.png" className="App-logo" alt="logo" />
                                </Link>
                            </Logo>
                            <LeftBar>
                                <div>
                                    <Chanel>
                                        <Link to="/" className="header-item">
                                            Đề Xuất
                                            <span className="selected"></span>
                                        </Link>
                                    </Chanel>
                                    <Chanel>
                                        <Link to="/type/phim-le" className="header-item">
                                            Phim Lẻ
                                            <span className="selected"></span>
                                        </Link>
                                    </Chanel>
                                    <Chanel>
                                        <Link to="/type/phim-bo" className="header-item">
                                            Phim bộ
                                            <span className="selected"></span>
                                        </Link>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Thể loại</div>
                                        <List className="list">
                                            {genre.map((g, i) => {
                                                return (
                                                    <div key={i}>
                                                        <Link to={'/genre/phim-' + convertSlug(g)}>{g}</Link>
                                                    </div>
                                                );
                                            })}
                                        </List>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Quốc gia</div>
                                        <List className="list">
                                            <div>
                                                <Link to="/country/trung-quoc">Trung Quốc</Link>
                                            </div>
                                            <div>
                                                <Link to="/country/au-my">Âu Mỹ</Link>
                                            </div>
                                            <div>
                                                <Link to="/country/thai-lan">Thái Lan</Link>
                                            </div>
                                            <div>
                                                <Link to="/country/viet-nam">Việt Nam</Link>
                                            </div>
                                            <div>
                                                <Link to="/country/an-do">Ấn độ</Link>
                                            </div>
                                            <div>
                                                <Link to="/country/nhat-ban">Nhật Bản</Link>
                                            </div>
                                            <div>
                                                <Link to="/country/han-quoc">Hàn Quốc</Link>
                                            </div>
                                            <div>
                                                <Link to="/country/dai-loan">Đài Loan</Link>
                                            </div>
                                            <div>
                                                <Link to="/country/hong-kong">Hồng Kông</Link>
                                            </div>
                                        </List>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Năm phát hành</div>
                                        <List className="list">
                                            <div>
                                                <Link to="/year/2015">2015</Link>
                                            </div>
                                            <div>
                                                <Link to="/year/2016">2016</Link>
                                            </div>
                                            <div>
                                                <Link to="/year/2017">2017</Link>
                                            </div>
                                            <div>
                                                <Link to="/year/2018">2018</Link>
                                            </div>
                                            <div>
                                                <Link to="/year/2019">2019</Link>
                                            </div>
                                            <div>
                                                <Link to="/year/2020">2020</Link>
                                            </div>
                                            <div>
                                                <Link to="/year/2021">2021</Link>
                                            </div>
                                        </List>
                                    </Chanel>
                                </div>
                            </LeftBar>
                            <RightBar>
                                <div onClick={handleOpenSearchBox}></div>
                                <SearchBox />
                                <HistoryAndFavorite>
                                    <div>
                                        <FormatIndentIncreaseIcon />
                                    </div>
                                    <List className="list_movie">
                                        <div>
                                            <div
                                                onClick={() => {
                                                    document.getElementById('line').style.transform = 'translateX(25px)';
                                                    document.getElementById('line').style.width = '120px';
                                                    setSelect(true);
                                                }}
                                            >
                                                <AccessTimeIcon /> &nbsp; Lịch sử xem
                                            </div>
                                            <div></div>
                                            <div
                                                onClick={() => {
                                                    setSelect(false);
                                                    document.getElementById('line').style.transform = 'translateX(175px)';
                                                    document.getElementById('line').style.width = '140px';
                                                }}
                                            >
                                                <PlaylistAddCheckIcon /> &nbsp; Sưu tập của tôi
                                            </div>
                                        </div>
                                        <div id="line"></div>
                                        <div></div>
                                        {select ? (
                                            <div>
                                                {auth?.history.map((episode, index) => {
                                                    const movie = movies.filter((m) => m._id === episode.movieId)[0];
                                                    return (
                                                        <div key={index}>
                                                            <Link
                                                                to={
                                                                    movie?.isSeries
                                                                        ? '/watch/' + movie?.slug + '-tap-' + episode.episode + '-' + movie?.isSeries
                                                                        : '/watch/' + movie?.slug + '-' + movie?.isSeries
                                                                }
                                                                title={movie?.title}
                                                            >
                                                                <div
                                                                    style={{
                                                                        backgroundImage: `url(${movie?.imgBanner})`,
                                                                    }}
                                                                ></div>
                                                                <div>{movie?.isSeries ? movie?.title + ' Tập ' + episode.episode : movie?.title}</div>
                                                            </Link>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <>
                                                {auth?._id ? (
                                                    <div>
                                                        {auth?.favorites.map((movie, index) => {
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
                                                ) : (
                                                    <div className="no_login">
                                                        <img src="http://www.iqiyipic.com/common/fix/empty_history.png" alt=""></img>
                                                        <div>Đăng nhập để quản lý bộ sưu tập phim của bạn trên các thiết bị khác nhau. </div>
                                                        <div
                                                            onClick={() => {
                                                                setOpenModal(true);
                                                            }}
                                                        >
                                                            Đăng nhập
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </List>
                                </HistoryAndFavorite>
                                <UserBox>
                                    {auth?._id ? (
                                        <>
                                            <div>
                                                <img src={auth.img} alt="" className="topAvatar" />
                                                <List className="list">
                                                    <div>
                                                        <span>{auth.fullName}</span>
                                                    </div>
                                                    <div>
                                                        <Link to="/personal/settings">Cài đặt cá nhân</Link>
                                                    </div>
                                                    <div onClick={handleLogout}>
                                                        <span>Đăng Xuất</span>
                                                    </div>
                                                </List>
                                            </div>
                                        </>
                                    ) : (
                                        <AccountCircleIcon
                                            onClick={() => {
                                                setOpenModal(true);
                                            }}
                                        />
                                    )}
                                </UserBox>
                                {auth?._id ? (
                                    <>
                                        {true && (
                                            <Logo>
                                                <Stripe>
                                                    <div>
                                                        <img
                                                            src="https://img.icons8.com/dusk/64/000000/vip.png"
                                                            className="App-logo"
                                                            alt="logo"
                                                            style={{ width: '40px', height: '40px' }}
                                                        />
                                                    </div>
                                                </Stripe>
                                            </Logo>
                                        )}
                                    </>
                                ) : (
                                    <Logo
                                        onClick={() => {
                                            document.querySelector('.messages').style.display = 'block';
                                            clearTimeout(timeId.current);
                                            timeId.current = setTimeout(() => {
                                                document.querySelector('.messages').style.display = 'none';
                                            }, 5000);
                                        }}
                                    >
                                        <div>
                                            <img
                                                src="https://img.icons8.com/dusk/64/000000/vip.png"
                                                className="App-logo"
                                                alt="logo"
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                        </div>
                                        <div className="messages">Vui lòng đăng nhập để sử dụng dịch vụ</div>
                                    </Logo>
                                )}
                            </RightBar>
                        </>
                    ) : (
                        <div style={{ alignItems: 'center', display: 'flex', height: '60px' }}>
                            <SearchBox className="searchBoxMobile" />
                            <Button onClick={handleOpenSearchBox} style={{ color: 'white' }}>
                                Huy
                            </Button>
                        </div>
                    )}
                </div>
            </NavBar>
        </>
    );
}
const NavBar = styled.div`
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 20000;
    top: 0px;
    vertical-align: middle;
    background-image: linear-gradient(0deg, rgba(51, 51, 51, 0) 0%, rgba(51, 51, 51, 0.75) 100%);
    transition: background-color 0.5s linear 0s;
    .container {
        justify-content: flex-end;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    & > div:nth-child(1) {
        height: 100%;
    }
    @media screen and (max-width: 767px) {
        height: 40px;
    }
`;
const MobileMenu = styled.div`
    display: none;
    height: 100%;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
    & > svg {
        width: 40px;
        height: 40px;
    }
    @media screen and (max-width: 1023px) {
        display: flex;
    }
    @media screen and (max-width: 767px) {
        & > svg {
            width: 30px;
            height: 30px;
        }
    }
`;
const Logo = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    div {
        margin: auto 0px;
        img {
            width: 40px;
            height: 40px;
        }
    }
    .messages {
        width: 200px;
        position: absolute;
        color: white;
        background: rgb(26, 28, 34);
        border: 1px solid rgba(255, 255, 255, 0.25);
        top: 55px;
        right: -50px;
        text-align: left;
        padding: 10px;
        display: none;
        font-size: 0.8rem;
        text-align: justify;
        border-radius: 5px;
    }
    @media screen and (max-width: 767px) {
        height: 40px;
        div {
            img {
                width: 30px;
                height: 30px;
            }
        }
    }
`;
const LeftBar = styled.div`
    height: 100%;
    flex: 1;
    & > div {
        display: flex;
        height: 100%;
        align-items: flex-end;
    }
    @media screen and (max-width: 1023px) {
        display: none;
    }
`;
const RightBar = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    & > div:nth-child(1) {
        display: none;

        &:hover {
            opacity: 0.7;
        }
    }
    @media screen and (max-width: 1023px) {
        flex: 1;
        justify-content: flex-end;
        & > div:nth-child(1) {
            display: inline-block;
            width: 32px;
            height: 30px;
            margin-top: 2px;
            border: 1 px solid rgba(255, 255, 255, 0.25);
            border-radius: 50%;
            background: url('//www.iqiyipic.com/common/fix/global/search@2x.png') center center / 60% 60% no-repeat rgba(0, 0, 0, 0.2);
        }
    }
`;
const Chanel = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
    position: relative;
    &:hover .list {
        display: flex;
    }
    .header-item {
        text-decoration: none;
        opacity: 0.7;
        font-size: 1rem;
        line-height: 1.5rem;
        height: 41px;
        cursor: pointer;
    }
    .header-item:hover {
        opacity: 1;
    }
    span {
        width: 100%;
        height: 3px;
        background: var(--primary-color);
        display: none;
        margin-top: 14px;
    }
    .header-item:hover span.selected {
        display: block;
    }
`;
const UserBox = styled.div`
    margin: 0 16px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    & > svg {
        height: 31px;
        width: 31px;
        opacity: 0.9;
        &:hover {
            opacity: 1;
        }
    }
    span {
        font-size: 0.875rem;
    }
    &:hover .list {
        display: flex;
        width: 150px;
        left: 0;
        flex-direction: column;
        & > div {
            width: 100%;
        }
        &:before {
            left: 65%;
        }
    }
    ul {
        width: 100%;
        li {
            width: 100%;
        }
    }
    position: relative;
    @media screen and (max-width: 1023px) {
        display: none;
    }
`;
const HistoryAndFavorite = styled.div`
    margin-left: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    & > div:nth-child(1) {
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &:hover .list_movie {
        display: block;
    }
    & > div:nth-child(2) {
        width: 340px;
        & > div:nth-child(1) {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 15px 15px 0;
            & > div {
                display: flex;
                justify-content: center;
                padding: 0 10px 15px;
            }
            & > div:nth-child(2) {
                width: 2px;
                height: 24px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                padding: 0;
            }
            &: hover {
                background: rgb(26, 28, 34);
            }
        }
        & > div:nth-child(3) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
            width: 100%;
        }
        & > div:nth-child(2) {
            border-bottom: 3px solid var(--primary-color);
            width: 120px;
            transform: translateX(25px);
            transition: transform 0.5s ease;
        }
        & > div:nth-child(4) {
            overflow-y: scroll;
            overflow-x: hidden;
            height: 300px;
            width: 100%;
            padding-top: 10px;
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
                        padding-top: 16.875%;
                        background-repeat: no-repeat;
                        width: 30%;
                        border-radius: 5px;
                        margin: 0;
                        background-size: cover;
                        object-fit: cover;
                    }
                    & > div:nth-child(2) {
                        padding-left: 1rem;
                        width: 60%;
                        font-size: 0.8rem;
                        text-align: left;
                    }
                }
            }
            &: hover {
                background: rgb(26, 28, 34);
            }
        }

        .no_login {
            overflow-y: hidden !important;
            padding-top: 30px !important;
            & > div:nth-child(2) {
                font-size: 0.8rem;
                color: rgb(130, 131, 135);
                letter-spacing: 0px;
                text-align: center;
                line-height: 1rem;
                padding: 10px 20px;
            }
            & > div:nth-child(3) {
                text-align: center;
                line-height: 1rem;
                padding: 10px 20px;
                background-color: var(--primary-color);
                width: 130px;
                border-radius: 5px;
                margin: 0 auto;
                &:hover {
                    background-color: var(--primary-color);
                    opacity: 0.5;
                }
            }
        }
    }
`;
const List = styled.div`
    display: none;
    list-style: none;
    margin: 0;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 4px;
    background: rgb(26, 28, 34);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-sizing: border-box;
    width: 360px;
    flex-direction: row;
    flex-wrap: wrap;
    & > div {
        text-align: center;
        line-height: 24px;
        font-size: 14px;
        width: calc(100% / 3);
        display: block;
        cursor: pointer;
        &:hover {
            background-color: #524d4d;
        }
        a,
        span {
            text-decoration: none;
            display: block;
            width: 100%;
            height: 100%;
            padding: 10px 0;
        }
    }
    &:after {
        content: '';
        width: 100%;
        height: 10px;
        background-color: transparent;
        top: -10px;
        position: absolute;
        right: 0;
        z-index: -2;
    }
    &:before {
        display: block;
        box-sizing: border-box;
        content: '';
        height: 12px;
        width: 12px;
        position: absolute;
        z-index: -1;
        top: -1px;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: rgb(26, 28, 34);
        border-left: 1 px solid rgba(255, 255, 255, 0.25);
        border-top: 1 px solid rgba(255, 255, 255, 0.25);
        border-radius: 4px 0px 0px;
        border: 1px solid rgba(255, 255, 255, 0.25);
    }
`;
