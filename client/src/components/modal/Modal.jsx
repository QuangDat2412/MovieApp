import { useState, memo, useCallback, useRef, useEffect } from 'react';
import '../../assets/css/style.scss';
import ClearIcon from '@material-ui/icons/Clear';
import Loader from '../loader/Loader';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';
import Input from '../input/Input';
import styled from 'styled-components';
import { login, register } from '../../redux/authRedux/apiCalls';
import { useDispatch } from 'react-redux';
import { publicRequest } from '../../requestMethods';

const Modal = (props) => {
    const [switchModal, setSwitchModal] = useState('login');

    const dispatch = useDispatch();

    const closeModal = () => {
        props.setOpenModal(false);
    };

    return (
        <FormModal>
            <Paper>
                {switchModal === 'login' && <Login setSwitchModal={setSwitchModal} dispatch={dispatch} closeModal={closeModal} />}
                {switchModal === 'register' && <Register setSwitchModal={setSwitchModal} dispatch={dispatch} closeModal={closeModal} />}
                {switchModal === 'forgotPassword' && <ForgotPassword setSwitchModal={setSwitchModal} closeModal={closeModal} />}
            </Paper>
            <Mask></Mask>
        </FormModal>
    );
};
const Login = (props) => {
    const [loader, setLoader] = useState(false);
    const [inputs, setInputs] = useState({});
    const [status, setStatus] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);
    const handleChange = useCallback((e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            ...inputs,
        };
        setLoader(true);
        login(props.dispatch, data).then((response) => {
            if (response._id) {
                props.closeModal();
            } else {
                setStatus('Tài khoản mật khẩu không chính xác !!!');
            }
            setLoader(false);
        });
    };
    return (
        <>
            <div className="paper-header">
                <div></div>
                <ClearIcon onClick={props.closeModal} />
            </div>
            <PaperContent>
                <div className="title">
                    <p>Đăng nhập</p>
                </div>
                {!(status === '') && <span>{status}</span>}
                <Input name="email" label="Email" type="email" onChange={handleChange} />
                <Input
                    name="password"
                    label="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    handleShowPassword={handleShowPassword}
                    onChange={handleChange}
                />
                <div className="btn">
                    {loader ? (
                        <Loader className="loader" />
                    ) : (
                        <Button fullWidth onClick={handleLogin}>
                            Đăng nhập
                        </Button>
                    )}
                </div>

                <div className="options">
                    <span
                        onClick={() => {
                            props.setSwitchModal('register');
                            setStatus('');
                            setInputs({});
                        }}
                    >
                        Đăng ký
                    </span>
                    <span
                        onClick={() => {
                            props.setSwitchModal('forgotPassword');
                            setStatus('');
                            setInputs({});
                        }}
                    >
                        Quên mật khẩu
                    </span>
                </div>
            </PaperContent>
        </>
    );
};
const Register = (props) => {
    useEffect(() => {
        return () => {
            setLoader();
            setStep();
            setInputs();
            setCheckEmail();
            setShowPassword();
            setCheckEmail();
            setTimer();
        };
    }, []);
    const [loader, setLoader] = useState(false);
    const [step, setStep] = useState(1);
    const handleChange = useCallback((e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const countRef = useRef(null);

    const [inputs, setInputs] = useState({});
    const [checkEmail, setCheckEmail] = useState({ message: '', error: false });
    const [checkOtp, setCheckOtp] = useState({ message: '', error: false });
    const [checkPassword, setCheckPassword] = useState({ message: '', error: false });
    const [checkRePassword, setCheckRePassword] = useState({ message: '', error: false });

    const [timer, setTimer] = useState(30);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const handleShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);
    const handleShowRePassword = useCallback(() => setShowRePassword(!showRePassword), [showRePassword]);

    const regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const reSend = () => {
        const data = {
            ...inputs,
        };
        publicRequest.post('/auth/sendmail', data).then((res) => {
            if (res.data) {
                setTimer(30);
                countRef.current = setInterval(() => {
                    setTimer((timer) => timer - 1);
                }, 1000);
                setTimeout(() => {
                    clearInterval(countRef.current);
                    setTimer(0);
                }, 30000);
            }
        });
    };
    const validate = (data) => {
        if (data.mail === '') {
            setCheckEmail({ message: 'Vui lòng nhập email', error: true });
        } else {
            setCheckEmail({
                message: regEmail.test(data.email) ? '' : 'Trường này không phải là email',
                error: regEmail.test(data.email) ? false : true,
            });
        }

        if (step === 3) {
            setCheckPassword({
                message: regPassword.test(data.password) ? '' : `Từ 8- 20 ký tự, ít nhất là tổ hợp của hai loại tùy ý gồm chữ cái, con số hoặc ký tự`,
                error: regPassword.test(data.password) ? false : true,
            });
            setCheckRePassword({
                message: data.rePassword === data.password ? '' : `Mật khẩu nhập vào hai lần không đồng nhất`,
                error: data.rePassword === data.password ? false : true,
            });
        }

        // code block
    };
    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            ...inputs,
        };
        setLoader(true);
        validate(data);
        switch (step) {
            case 1:
                if (regEmail.test(data.email) && data.email !== '' && regPassword.test(data.password) && data.password === data.rePassword) {
                    publicRequest.post('/auth/sendmail/register', data).then((res) => {
                        if (res.data) {
                            setStep(2);
                            countRef.current = setInterval(() => {
                                setTimer((timer) => timer - 1);
                            }, 1000);
                            setTimeout(() => {
                                clearInterval(countRef.current);
                                setTimer(0);
                            }, 30000);
                        } else {
                            setCheckEmail({
                                message: 'Email đã được sử dụng',
                                error: true,
                            });
                        }
                        setLoader(false);
                    });
                } else {
                    setLoader(false);
                }
                break;
            case 2:
                register(data, props.dispatch).then((res) => {
                    if (res) {
                        props.setSwitchModal('login');
                    } else {
                        setCheckOtp({
                            message: 'Mã OTP không chính xác',
                            error: true,
                        });
                    }
                    setLoader(false);
                });
                break;
            default:
        }
    };
    return (
        <>
            <div className="paper-header">
                <ArrowBackIosIcon
                    onClick={() => {
                        props.setSwitchModal('login');
                        setInputs({});
                    }}
                />
                <ClearIcon onClick={props.closeModal} />
            </div>
            <PaperContent>
                <div className="title">
                    <p>Đăng ký</p>
                </div>
                {step === 1 && (
                    <>
                        <Input
                            name="email"
                            label="Email"
                            type="email"
                            onChange={handleChange}
                            helperText={checkEmail.message}
                            error={checkEmail.error}
                            onFocus={() => {
                                setCheckEmail({
                                    message: '',
                                    error: false,
                                });
                            }}
                        />
                        <Input name="fullName" label="Tên tài khoản" type="text" onChange={handleChange} />
                        <Input
                            name="password"
                            label="Mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                            onChange={handleChange}
                            helperText={checkPassword.message}
                            error={checkPassword.error}
                        />
                        <Input
                            name="rePassword"
                            label="Nhập lại mật khẩu"
                            type={showRePassword ? 'text' : 'password'}
                            handleShowPassword={handleShowRePassword}
                            onChange={handleChange}
                            helperText={checkRePassword.message}
                            error={checkRePassword.error}
                        />
                    </>
                )}
                {step === 2 && (
                    <>
                        {' '}
                        <Input
                            name="otp"
                            label="Mã OTP"
                            type="number"
                            onChange={handleChange}
                            helperText={checkOtp.message}
                            error={checkOtp.error}
                            onFocus={() => {
                                setCheckOtp({
                                    message: '',
                                    error: false,
                                });
                            }}
                        />
                        <div className="message">
                            {timer === 0 ? (
                                <h1 onClick={reSend}>Nhấn để nhận lại mã OTP</h1>
                            ) : (
                                <h2>{`Sau khi đợi ${timer}s có thể nhận lại mã xác thực lần nữa`}</h2>
                            )}
                        </div>
                    </>
                )}
                <div className="btn" style={{ marginBottom: '0' }}>
                    {loader ? (
                        <Loader className="loader" />
                    ) : (
                        <Button fullWidth onClick={handleRegister}>
                            {step === 2 ? 'Đăng ký' : 'Tiếp'}
                        </Button>
                    )}
                </div>
            </PaperContent>
        </>
    );
};
const ForgotPassword = (props) => {
    const { setSwitchModal, closeModal } = props;

    return (
        <>
            <div className="paper-header">
                <ArrowBackIosIcon
                    onClick={() => {
                        setSwitchModal('login');
                    }}
                />
                <ClearIcon onClick={closeModal} />
            </div>
            <PaperContent>
                <div className="title">
                    <p>Tìm lại mật khẩu</p>
                </div>
                <Input name="email" label="Email" type="email" />
                <Button fullWidth>Tiếp</Button>
            </PaperContent>
        </>
    );
};
const FormModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin-top: 40px;
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
        & > svg {
            cursor: pointer;
            color: var(--primary-color);
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
            height: 75%;
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
export default memo(Modal);
