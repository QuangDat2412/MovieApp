/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, updateUser } from '../redux/authRedux/apiCalls';
import { useState, useEffect } from 'react';
import { regPassword } from '../utils';
import ClearIcon from '@material-ui/icons/Clear';
import Loader from '../components/Loader';
import Input from '../components/Input';
import Button from '../components/Button';
import Stripe from '../components/Stripe';
const Personal = () => {
    const auth = useSelector((state) => state.auth.currentUser);
    const { slug } = useParams();
    const movies = useSelector((state) => state.movie?.movies);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const history = useHistory();
    const [options, setOptions] = useState();
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
            <FormModal>{openModal && <Modal setOpenModal={setOpenModal} options={options} auth={auth} dispatch={dispatch} />}</FormModal>
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
                    {slug === 'settings' && <Setting auth={auth} setOpenModal={setOpenModal} setOptions={setOptions} />}
                    {slug === 'history' && <History auth={auth} movies={movies} />}
                    {slug === 'favorite' && <Favorite auth={auth} />}
                </div>
            </Container>
        </>
    );
};

const Setting = (props) => {
    const { auth, setOpenModal, setOptions } = props;
    const openModal = () => {
        setOpenModal(true);
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
                        {auth?.isVip ? (
                            <img
                                src="https://img.icons8.com/dusk/64/000000/vip.png"
                                className="App-logo"
                                alt="logo"
                                style={{ width: '40px', height: '40px' }}
                            />
                        ) : (
                            <div>
                                <Stripe>
                                    <Button>Kích hoạt VIP chỉ 633đ/ngày</Button>
                                </Stripe>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div className="sub-title">Tài khoản và bảo mật</div>
                    <div className="line"></div>
                    <div className="account">
                        <p>Tên tài khoản</p>
                        <div>
                            <span>{auth?.fullName}</span>
                            <span
                                className="btn"
                                onClick={() => {
                                    setOptions('fullName');
                                    openModal();
                                }}
                            >
                                Sửa đổi
                            </span>
                        </div>
                    </div>
                    <div className="account">
                        <p>Email</p>
                        <div>
                            <span>{auth?.email.replace(/(\w{2})[\w.-]+@([\w.]+\w)/, '$1***@$2')}</span>
                        </div>
                    </div>
                    <div className="account">
                        <p>Số điện thoại</p>
                        <div>
                            <span>{auth?.phone.replace(/(\d{1})(.*)(\d{3})/, '$1******$3')}</span>
                            <span
                                className="btn"
                                onClick={() => {
                                    setOptions('phone');
                                    openModal();
                                }}
                            >
                                Sửa đổi
                            </span>
                        </div>
                    </div>
                    <div className="account">
                        <p>Ảnh Đại Diện</p>
                        <div>
                            <span></span>
                            <span
                                className="btn"
                                onClick={() => {
                                    setOptions('img');
                                    openModal();
                                }}
                            >
                                Sửa đổi
                            </span>
                        </div>
                    </div>
                    <div className="account">
                        <p>Mật khẩu</p>
                        <div>
                            <span className="password">●●●●●●●●●●●●●</span>
                            <span
                                className="btn"
                                onClick={() => {
                                    setOptions('password');
                                    openModal();
                                }}
                            >
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
    const { auth, movies } = props;

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
                {auth?.history.map((episode, index) => {
                    const movie = movies.filter((m) => m._id === episode.movieId)[0];
                    return (
                        <div key={index}>
                            <Link
                                to={
                                    movie?.isSeries
                                        ? '/watch/' + movie?.slug + '-tap-' + episode?.episode + '-' + movie?.isSeries
                                        : '/watch/' + movie?.slug + '-' + movie?.isSeries
                                }
                                title={movie?.title}
                            >
                                <div>
                                    <div
                                        style={{
                                            backgroundImage: `url(${movie?.imgBanner})`,
                                        }}
                                        alt=""
                                        className="imgItem"
                                    ></div>
                                </div>
                                <h3>{movie?.isSeries ? movie?.title + ' Tập ' + episode.episode : movie?.title}</h3>
                            </Link>
                        </div>
                    );
                })}
            </ListEpisode>
        </HistoryPaper>
    );
};
const Favorite = (props) => {
    const { auth } = props;

    return (
        <FavoritePaper>
            <div className="title">Sưu tập của tôi</div>
            <div>
                <div>
                    <Button>Chỉnh sửa</Button>
                </div>
                <div className="line"></div>
                <ListEpisode>
                    {auth?.favorites.map((movie, index) => {
                        return (
                            <div key={index}>
                                <Link to={'/detail/' + movie?.slug} title={movie?.title}>
                                    <div>
                                        <div
                                            style={{
                                                backgroundImage: `url(${movie?.imgBanner})`,
                                            }}
                                            alt=""
                                            className="imgItem"
                                        ></div>
                                    </div>
                                    <h3>{movie?.title}</h3>
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
    const [loader, setLoader] = useState(false);

    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const [status, setStatus] = useState('');

    const [password, setPassword] = useState({ message: '', error: false, show: false });
    const [rePassword, setRePassword] = useState({ message: '', error: false, show: false });
    const [oldPassword, setOldPassword] = useState({ message: '', error: false, show: false });
    const handleShowPassword = (e) => {
        switch (e) {
            case 'password':
                setPassword({ ...password, show: !password.show });
                break;
            case 'rePassword':
                setRePassword({ ...rePassword, show: !rePassword.show });
                break;
            case 'oldPassword':
                setOldPassword({ ...oldPassword, show: !oldPassword.show });
                break;
            default:
        }
    };

    const validate = (data) => {
        setPassword({
            ...password,
            message: regPassword.test(data.password) ? '' : `Từ 8- 20 ký tự, ít nhất là tổ hợp của hai loại tùy ý gồm chữ cái, con số hoặc ký tự`,
            error: regPassword.test(data.password) ? false : true,
        });
        setRePassword({
            ...rePassword,
            message: regPassword.test(data.password) ? '' : `Từ 8- 20 ký tự, ít nhất là tổ hợp của hai loại tùy ý gồm chữ cái, con số hoặc ký tự`,
            error: regPassword.test(data.password) ? false : true,
        });
        setOldPassword({
            ...oldPassword,
            message: data.rePassword === data.password ? '' : `Mật khẩu nhập vào hai lần không đồng nhất`,
            error: data.rePassword === data.password ? false : true,
        });

        // code block
    };
    useEffect(() => {
        const logKey = (e) => {
            const keyCode = e.keyCode;
            if (keyCode === 13) {
                handleUpdate();
            }
            // code block
        };
        document.addEventListener('keyup', logKey);
        return () => {
            document.removeEventListener('keyup', logKey);
        };
    }, []);
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            ...inputs,
        };
        setLoader(true);
        validate(data);
        updateUser(props.auth._id, data, props.dispatch).then((res) => {
            if (res) {
                closeModal();
            } else {
                setStatus('Thay đổi chưa thành công');
            }
            setLoader(false);
        });
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
                <PaperContent>
                    <div className="title">
                        <p>Sửa Đổi Thông Tin</p>
                    </div>
                    <Form>
                        {!(status === '') && <span>{status}</span>}
                        {props.options === 'fullName' && (
                            <>
                                <Input name="fullName" label="Tên tài khoản" type="text" onChange={handleChange} />
                            </>
                        )}
                        {props.options === 'phone' && (
                            <>
                                <Input name="phone" label="Số Điện Thoại" type="number" onChange={handleChange} />
                            </>
                        )}
                        {props.options === 'img' && (
                            <>
                                <Input name="img" label="Ảnh đại diện" type="text" onChange={handleChange} />
                            </>
                        )}
                        {props.options === 'password' && (
                            <>
                                {' '}
                                <Input
                                    name="oldPassword"
                                    label="Nhập lại mật khẩu"
                                    type={oldPassword.show ? 'text' : 'password'}
                                    handleShowPassword={handleShowPassword}
                                    onChange={handleChange}
                                    helperText={oldPassword.message}
                                    error={oldPassword.error}
                                    onFocus={() => {
                                        setOldPassword({
                                            ...oldPassword,
                                            message: '',
                                            error: false,
                                        });
                                    }}
                                />
                                <Input
                                    name="password"
                                    label="Mật khẩu"
                                    type={password.show ? 'text' : 'password'}
                                    handleShowPassword={handleShowPassword}
                                    onChange={handleChange}
                                    helperText={password.message}
                                    error={password.error}
                                    onFocus={() => {
                                        setPassword({
                                            ...password,
                                            message: '',
                                            error: false,
                                        });
                                    }}
                                />
                                <Input
                                    name="rePassword"
                                    label="Nhập lại mật khẩu"
                                    type={rePassword.show ? 'text' : 'password'}
                                    handleShowPassword={handleShowPassword}
                                    onChange={handleChange}
                                    helperText={rePassword.message}
                                    error={rePassword.error}
                                    onFocus={() => {
                                        setRePassword({
                                            ...rePassword,
                                            message: '',
                                            error: false,
                                        });
                                    }}
                                />
                            </>
                        )}
                        <div className="btn" style={{ marginBottom: '0' }}>
                            {loader ? (
                                <Loader className="loader" />
                            ) : (
                                <Button fullWidth onClick={handleUpdate}>
                                    Cập nhật
                                </Button>
                            )}
                        </div>
                    </Form>
                </PaperContent>
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
const PaperContent = styled.div`
    padding: 0 40px 20px;
    overflow-y: scroll;
    overflow-y: overlay;
    max-height: 500px;
    & > div {
        margin: 20px 0;
    }
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #e2dbdb;
    }
    & > span {
        display: block;
        color: red;
        font-size: 0.8rem;
    }
    .title {
        p {
            font-size: 1.125rem;
            color: #222;
            letter-spacing: 0;
            font-weight: 700;
            text-align: center;
            line-height: 1.75rem;
            margin: 0;
        }
    }
    button {
        color: var(--white);
        background: var(--primary-color);
        &:hover {
            opacity: 0.7;
            background: var(--primary-color);
        }
    }
    button {
        height: 30px;
        width: 30px;
    }
    .btn {
        position: relative;
        height: 50px;
        button {
            width: 100%;
            height: 100%;
        }
    }
    .options {
        margin: 20px 0 0;
        span {
            color: #222;
            letter-spacing: 0;
            text-align: center;
            line-height: 1rem;
            color: #00c234;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 600;
            text-align: center;
            display: inline-block;
            margin: 0 40px;
            &:hover {
                opacity: 0.7;
            }
        }
    }
    .message {
        color: var(--primary-color);
        h1 {
            font-size: 1rem;
            cursor: pointer;
            font-weight: 500;
        }
        h2 {
            font-size: 0.85rem;
            color: #000;
            font-weight: 500;
        }
    }
`;
const Form = styled.form`
    & > div {
        margin: 10px 0;
    }
    & > div:last-child {
        margin: 30px 0;
    }
`;

export default Personal;
