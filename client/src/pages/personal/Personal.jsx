/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import { getEpisodes } from '../../redux/episodeRedux/apiCalls';
import { useDispatch } from 'react-redux';
import { logout, updateUser } from '../../redux/authRedux/apiCalls';
import { useState, useEffect } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../../requestMethods';

export default function Personal() {
    const auth = useSelector((state) => state.auth.currentUser);
    const { slug } = useParams();
    const movies = useSelector((state) => state.movie.movies);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (openModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
        if (!auth?._id) {
            history.push('/');
        }
    }, [openModal]);
    const handleLogout = () => {
        logout(dispatch);
        history.push('/');
    };
    return (
        <>
            <FormModal>{openModal && <Modal setOpenModal={setOpenModal} />}</FormModal>
            <Container>
                <div>
                    <div>
                        <img src={auth?.img ? auth.img : 'nguoi dung'} alt="" />
                        <span>{auth?.fullName ? auth.fullName : 'nguoi dung'}</span>
                    </div>
                    <div>
                        <Link to="/personal/history" style={{ color: `${slug === 'history' ? 'var(--primary-color)' : ''}` }}>
                            Lịch sử xem
                        </Link>
                    </div>
                    <div>
                        <Link to="/personal/favorite" style={{ color: `${slug === 'favorite' ? 'var(--primary-color)' : ''}` }}>
                            Bộ sưu tập của tôi
                        </Link>
                    </div>
                    <div>
                        <Link to="/personal/settings" style={{ color: `${slug === 'settings' ? 'var(--primary-color)' : ''}` }}>
                            {' '}
                            Cài đặt cá nhân
                        </Link>
                    </div>
                    <div onClick={handleLogout}>Đăng xuất</div>
                </div>
                <div>
                    {slug === 'settings' && <Setting auth={auth} setOpenModal={setOpenModal} dispatch={dispatch} />}
                    {slug === 'history' && <History auth={auth} movies={movies} dispatch={dispatch} />}
                    {slug === 'favorite' && <Favorite auth={auth} movies={movies} />}
                </div>
            </Container>
        </>
    );
}

const Setting = (props) => {
    const { auth, dispatch, setOpenModal } = props;
    const openModal = () => {
        setOpenModal(true);
    };
    const KEY = 'pk_test_51Jlwr4F6PLZamBS7ciFKixxTt5J3JXM1NeMVUTju2g0ISci6lP6Z38dDHHQC1AGkKDIqmrP66PyLzUWxCfRQfgEM002KufD8N4';

    const [stripeToken, setStripeToken] = useState(null);
    useEffect(() => {
        const makeRequest = async () => {
            try {
                await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: 100,
                });
                updateUser(auth._id, { isVip: true }, dispatch);
            } catch {}
        };
        stripeToken && makeRequest();
    }, [stripeToken]);
    const onToken = (token) => {
        setStripeToken(token);
    };
    return (
        <SettingPaper>
            <div className="title">Cài đặt cá nhân</div>
            <div>
                <div className="sub-title" style={{ justifyContent: 'flex-start' }}>
                    Thông tin cá nhân
                </div>
                <div className="line"></div>
                <div className="portrait">
                    <div>
                        <img src={auth?.img ? auth.img : 'nguoi dung'} alt="" />
                    </div>
                    <div>
                        <div>{auth?.fullName}</div>
                        {auth.isVip ? (
                            <img
                                src="https://img.icons8.com/dusk/64/000000/vip.png"
                                className="App-logo"
                                alt="logo"
                                style={{ width: '40px', height: '40px' }}
                            />
                        ) : (
                            <div>
                                <StripeCheckout
                                    name="Movie App"
                                    image="https://avatars.githubusercontent.com/u/1486366?v=4"
                                    description={`Your total is $5.00`}
                                    amount={100}
                                    token={onToken}
                                    stripeKey={KEY}
                                >
                                    <Button>Kích hoạt VIP chỉ 633đ/ngày</Button>
                                </StripeCheckout>
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <div>Tên tài khoản</div>
                    <input type="text" defaultValue={auth?.fullName} />
                    <div>
                        <Button
                            className="btn"
                            disabled
                            onClick={() => {
                                console.log('1');
                            }}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            className="btn"
                            onClick={() => {
                                console.log('2');
                            }}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="sub-title">Tài khoản và bảo mật</div>
                    <div className="line"></div>
                    <div className="account">
                        <p>Email</p>
                        <div>
                            <span>{auth?.email.replace(/(\w{2})[\w.-]+@([\w.]+\w)/, '$1***@$2')}</span>
                            <span className="btn" onClick={openModal}>
                                Sửa đổi
                            </span>
                        </div>
                    </div>
                    <div className="account">
                        <p>Số điện thoại</p>
                        <div>
                            <span>{auth?.phone.replace(/(\d{1})(.*)(\d{3})/, '$1******$3')}</span>
                            <span className="btn" onClick={openModal}>
                                Sửa đổi
                            </span>
                        </div>
                    </div>
                    <div className="account">
                        <p>Mật khẩu</p>
                        <div>
                            <span className="password">●●●●●●●●●●●●●</span>
                            <span className="btn" onClick={openModal}>
                                Sửa đổi
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </SettingPaper>
    );
};
const History = (props) => {
    const { auth, movies, dispatch } = props;
    useEffect(() => {
        getEpisodes('', dispatch);
    }, []);
    const episodes = useSelector((state) => {
        return state.episode.episodes;
    });
    const arrayEpisodes = [...episodes];

    const NewArrayEpisodes = arrayEpisodes.filter((e) => {
        return auth?.history.includes(e._id);
    });
    const historyListMovie = NewArrayEpisodes.map((e) => {
        return movies.filter((m) => m._id === e.movieId)[0];
    });
    return (
        <HistoryPaper>
            <div className="title">Lịch sử xem</div>
            <div>
                <div>
                    <Button>Chỉnh sửa</Button>
                </div>
                <div className="line"></div>
            </div>
            <ListEpisode>
                {NewArrayEpisodes.map((episode, index) => {
                    const movie = historyListMovie[index];
                    return (
                        <div key={index}>
                            <Link
                                to={
                                    movie.isSeries
                                        ? '/watch/' + movie.slug + '-tap-' + episode.episode + '-' + movie.isSeries
                                        : '/watch/' + movie.slug + '-' + movie.isSeries
                                }
                                title={movie.title}
                            >
                                <div>
                                    <div
                                        style={{
                                            backgroundImage: `url(${movie.imgBanner})`,
                                        }}
                                        alt=""
                                        className="imgItem"
                                    ></div>
                                </div>
                                <h3>{movie.isSeries ? movie.title + ' Tập ' + episode.episode : movie.title}</h3>
                            </Link>
                        </div>
                    );
                })}
            </ListEpisode>
        </HistoryPaper>
    );
};
const Favorite = (props) => {
    const { auth, movies } = props;

    const favoriteListMovie = movies.filter((e) => {
        return auth?.favorites.includes(e._id);
    });
    return (
        <FavoritePaper>
            <div className="title">Sưu tập của tôi</div>
            <div>
                <div>
                    <Button>Chỉnh sửa</Button>
                </div>
                <div className="line"></div>
                <ListEpisode>
                    {favoriteListMovie.map((movie, index) => {
                        return (
                            <div key={index}>
                                <Link to={'/info/' + movie.slug} title={movie.title}>
                                    <div>
                                        <div
                                            style={{
                                                backgroundImage: `url(${movie.imgBanner})`,
                                            }}
                                            alt=""
                                            className="imgItem"
                                        ></div>
                                    </div>
                                    <h3>{movie.title}</h3>
                                </Link>
                            </div>
                        );
                    })}
                </ListEpisode>
            </div>
        </FavoritePaper>
    );
};
const Modal = (props) => {
    const closeModal = () => {
        props.setOpenModal(false);
    };
    return (
        <div>
            <Paper>
                <div className="paper-header">
                    <div></div>
                    <div onClick={closeModal}>
                        <ClearIcon />
                    </div>
                </div>
            </Paper>
            <Mask></Mask>
        </div>
    );
};
const Container = styled.div`
    padding-top: 60px;
    display: flex;
    & > div:nth-child(1) {
        width: 240px;
        background-color: rgb(26, 28, 34);
        min-height: 100vh;
        padding: 2rem 1rem 0 4rem;
        & > div:nth-child(1) {
            width: 100%;
            height: auto;
            background: url('https://www.iqiyipic.com/lequ/20211013/person-backgroud.png') center center / cover no-repeat;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-bottom: 10px;
            }
        }
        & > div {
            a {
                padding: 1rem 0;
                display: inline-block;
                width: 100%;
                height: 100%;
            }
            cursor: pointer;
            &:hover {
                color: var(--primary-color);
            }
        }
        & > div:nth-child(2) {
            margin-top: 1rem;
        }
        & > div:last-child,
        & > div:nth-child(1) {
            padding: 1rem 0;
        }
    }
    & > div:nth-child(2) {
        padding: 2.5rem 0;
        flex: 1;
        & > div {
            margin: 0 auto;
            .title {
                font-size: 30px;
                display: inline-block;
                line-height: 41px;
                width: 100%;
                text-align: center;
            }
            .line {
                width: 100%;
                height: 1px;
                background: rgb(255, 255, 255);
                opacity: 0.1;
                margin-top: 10px;
            }
            & > div:nth-child(2) {
                & > div:nth-child(1) {
                    display: flex;
                    justify-content: flex-end;
                    button {
                        background-color: var(--primary-color);
                        font-size: 0.8rem;
                        font-weight: 300;
                        padding: 5px 10px;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 767px) {
        padding-top: 40px;
    }
`;
const SettingPaper = styled.div`
    width: 600px;

    & > div:nth-child(2) {
        & > div {
            margin: 10px 0;
        }
        .sub-title {
            opacity: 0.6;
            font-size: 20px;
            color: var(--white);
            margin-bottom: 8px;
            margin-top: 20px;
        }
        .portrait {
            margin-top: 20px;
            display: flex;
            & > div:nth-child(1) {
                img {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                }
            }
            & > div:nth-child(2) {
                margin-left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                button {
                    background-color: rgb(242, 191, 131);
                    padding: 5px 0;
                    color: #000;
                    font-weight: 300;
                    font-size: 0.8rem;
                    width: 250px;
                    margin-top: 10px;
                }
            }
        }
        .form-group {
            & > div:nth-child(1) {
                opacity: 0.87;
                font-size: 1rem;
            }
            input {
                margin-top: 10px;
                width: 100%;
                height: 44px;
                border-radius: 2px;
                background: rgb(32, 35, 41);
                border: 1px solid rgba(219, 219, 219, 0.5);
                color: rgb(116, 118, 122);
                appearance: none;
                padding-left: 1rem;
                box-sizing: border-box;
                outline: none;
                font-size: 1rem;
                &:focus {
                    border: 1px solid rgb(11, 190, 6);
                }
            }
            & > div:nth-child(3) {
                display: flex;
                justify-content: center;
                button {
                    margin-top: 20px;
                    font-size: 0.8rem;
                    font-weight: 300;
                    padding: 5px 10px;
                }
                .btn:nth-child(1) {
                    border: 1px solid rgb(0, 204, 54);
                    background-color: #111319;
                }
                .btn:nth-child(2) {
                    background-color: var(--primary-color);
                    margin-left: 20px;
                }
            }
        }
        .account {
            margin: 20px 0;
            p {
                opacity: 0.87;
                color: #fff;
                letter-spacing: 0px;
                margin-bottom: 10px;
            }
            & > div {
                display: flex;
                justify-content: space-between;
                span {
                    display: inline-block;
                    font-size: 0.8rem;
                }
                .btn {
                    color: rgb(0, 184, 48);
                    cursor: pointer;
                }
                .password {
                    opacity: 0.2;
                    font-size: 1rem;
                }
            }
        }
    }
`;
const FavoritePaper = styled.div`
    width: 90%;
`;
const HistoryPaper = styled.div`
    width: 90%;
`;
const ListEpisode = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    margin-right: -1rem;
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
                font-size: 0.7rem;
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
const FormModal = styled.div`
    position: fixed;
    top: 100px;
    right: calc(50% - 200px);
    z-index: 100000;
    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
const Mask = styled.div`
    position: fixed;
    z-index: 100001;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
`;
const Paper = styled.div`
    width: 400px;
    z-index: 100002;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 20%);
    min-height: 350px;
    position: relative;

    .loader {
        width: 30px;
        height: 30px;
        right: calc(50% - 15px);
        top: calc(50% - 15px);
    }
    .paper-header {
        padding: 12px 12px 4px;
        display: flex;
        justify-content: space-between;
        & > div:nth-child(2) {
            width: 30px;
            height: 30px;
            cursor: pointer;
            & > svg {
                color: var(--primary-color);
            }
        }
    }
    height: auto;
    overflow: hidden;
`;
