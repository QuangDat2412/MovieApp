/* eslint-disable react-hooks/exhaustive-deps */
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
import { regEmail, regPassword } from '../../utils';
const Modal = (props) => {
    const [switchModal, setSwitchModal] = useState('login');

    const dispatch = useDispatch();

    const closeModal = () => {
        props.setOpenModal(false);
    };
    const [inputs, setInputs] = useState({});

    const [password, setPassword] = useState({ message: '', error: false, show: false });
    const [rePassword, setRePassword] = useState({ message: '', error: false, show: false });
    const [email, setEmail] = useState({ message: '', error: false });
    const handleShowPassword = (e) => {
        switch (e) {
            case 'password':
                setPassword({ ...password, show: !password.show });
                break;
            case 'rePassword':
                setRePassword({ ...rePassword, show: !rePassword.show });
                break;

            default:
        }
    };
    const handleChange = useCallback((e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const [status, setStatus] = useState('');

    const validate = (data) => {
        if (data.mail === '') {
            setEmail({ message: 'Vui lòng nhập email', error: true });
        } else {
            setEmail({
                message: regEmail.test(data.email) ? '' : 'Trường này không phải là email',
                error: regEmail.test(data.email) ? false : true,
            });
        }
        setPassword({
            ...rePassword,
            message: regPassword.test(data.password) ? '' : `Từ 8- 20 ký tự, ít nhất là tổ hợp của hai loại tùy ý gồm chữ cái, con số hoặc ký tự`,
            error: regPassword.test(data.password) ? false : true,
        });
        setRePassword({
            ...rePassword,
            message: data.rePassword === data.password ? '' : `Mật khẩu nhập vào hai lần không đồng nhất`,
            error: data.rePassword === data.password ? false : true,
        });

        // code block
    };
    return (
        <FormModal>
            <div>
                <Paper>
                    {switchModal === 'login' && (
                        <Login
                            validate={validate}
                            handleShowPassword={handleShowPassword}
                            setSwitchModal={setSwitchModal}
                            dispatch={dispatch}
                            closeModal={closeModal}
                            handleChange={handleChange}
                            setEmail={setEmail}
                            setInputs={setInputs}
                            setPassword={setPassword}
                            email={email}
                            password={password}
                            inputs={inputs}
                            status={status}
                            setStatus={setStatus}
                        />
                    )}
                    {switchModal === 'register' && (
                        <Register
                            validate={validate}
                            handleShowPassword={handleShowPassword}
                            setSwitchModal={setSwitchModal}
                            dispatch={dispatch}
                            closeModal={closeModal}
                            handleChange={handleChange}
                            setEmail={setEmail}
                            setInputs={setInputs}
                            setPassword={setPassword}
                            setRePassword={setRePassword}
                            email={email}
                            password={password}
                            rePassword={rePassword}
                            inputs={inputs}
                            status={status}
                            setStatus={setStatus}
                        />
                    )}
                    {switchModal === 'forgotPassword' && (
                        <ForgotPassword
                            validate={validate}
                            handleShowPassword={handleShowPassword}
                            setSwitchModal={setSwitchModal}
                            dispatch={dispatch}
                            closeModal={closeModal}
                            handleChange={handleChange}
                            setEmail={setEmail}
                            setInputs={setInputs}
                            setPassword={setPassword}
                            setRePassword={setRePassword}
                            email={email}
                            password={password}
                            rePassword={rePassword}
                            inputs={inputs}
                            status={status}
                            setStatus={setStatus}
                        />
                    )}
                </Paper>
                <Mask></Mask>
            </div>
        </FormModal>
    );
};
const Login = (props) => {
    const [loader, setLoader] = useState(false);

    const {
        validate,
        handleShowPassword,
        setSwitchModal,
        dispatch,
        closeModal,
        handleChange,
        setEmail,
        setInputs,
        setPassword,
        email,
        password,
        inputs,
        status,
        setStatus,
    } = props;
    useEffect(() => {
        const logKey = (e) => {
            const keyCode = e.keyCode;
            if (keyCode === 13) {
                handleLogin();
            }
            // code block
        };
        document.addEventListener('keyup', logKey);
        return () => {
            document.removeEventListener('keyup', logKey);
        };
    }, [inputs]);
    const handleLogin = () => {
        const data = {
            ...inputs,
        };
        setLoader(true);
        validate(data);
        login(dispatch, data).then((response) => {
            if (response._id) {
                closeModal();
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
                <ClearIcon onClick={closeModal} />
            </div>
            <PaperContent>
                <div className="title">
                    <p>Đăng nhập</p>
                </div>
                <Form>
                    {!(status === '') && <span>{status}</span>}
                    <Input
                        name="email"
                        label="Email"
                        type="email"
                        onChange={handleChange}
                        helperText={email.message}
                        error={email.error}
                        onFocus={() => {
                            setEmail({
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
                    <div className="btn">
                        {loader ? (
                            <Loader className="loader" />
                        ) : (
                            <Button fullWidth onClick={handleLogin}>
                                Đăng nhập
                            </Button>
                        )}
                    </div>
                </Form>

                <div className="options">
                    <span
                        onClick={() => {
                            setSwitchModal('register');
                            setStatus('');
                            setInputs({});
                        }}
                    >
                        Đăng ký
                    </span>
                    <span
                        onClick={() => {
                            setSwitchModal('forgotPassword');
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
    const {
        validate,
        handleShowPassword,
        setSwitchModal,
        dispatch,
        closeModal,
        handleChange,
        setEmail,
        setInputs,
        setPassword,
        setRePassword,
        email,
        password,
        rePassword,
        inputs,
        setStatus,
    } = props;

    useEffect(() => {
        const logKey = (e) => {
            const keyCode = e.keyCode;
            if (keyCode === 13) {
                handleRegister();
            }
            // code block
        };
        document.addEventListener('keyup', logKey);
        return () => {
            document.removeEventListener('keyup', logKey);
            setLoader();
            setStep();
        };
    }, []);
    const [loader, setLoader] = useState(false);
    const [step, setStep] = useState(1);
    const countRef = useRef(null);
    const [timer, setTimer] = useState(30);
    const reSend = () => {
        const data = {
            ...inputs,
        };
        publicRequest.post('/auth/sendmail/register', data).then((res) => {
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
    const [checkOtp, setCheckOtp] = useState({ message: '', error: false });

    const handleRegister = (e) => {
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
                            setEmail({
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
                register(data, dispatch).then((res) => {
                    if (res) {
                        setSwitchModal('login');
                        setInputs({});
                        setStatus('Đăng ký tài khoản thành công');
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
                        setSwitchModal('login');
                        setInputs({});
                    }}
                />
                <ClearIcon onClick={closeModal} />
            </div>
            <PaperContent>
                <div className="title">
                    <p>Đăng ký</p>
                </div>
                <Form>
                    {step === 1 && (
                        <>
                            <Input
                                name="email"
                                label="Email"
                                type="email"
                                onChange={handleChange}
                                helperText={email.message}
                                error={email.error}
                                onFocus={() => {
                                    setEmail({
                                        message: '',
                                        error: false,
                                    });
                                }}
                            />
                            <Input name="fullName" label="Tên tài khoản" type="text" onChange={handleChange} />
                            <Input
                                name="password"
                                label="Mật khẩu"
                                type={password.show ? 'text' : 'password'}
                                handleShowPassword={handleShowPassword}
                                onChange={handleChange}
                                helperText={password.message}
                                error={password.error}
                                onFocus={() => {
                                    setPassword({ ...password, message: '', error: false });
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
                </Form>
            </PaperContent>
        </>
    );
};
const ForgotPassword = (props) => {
    const {
        validate,
        handleShowPassword,
        setSwitchModal,
        closeModal,
        handleChange,
        setEmail,
        setInputs,
        setPassword,
        setRePassword,
        email,
        password,
        rePassword,
        regPassword,
        inputs,
        setStatus,
    } = props;
    const [otp, setOtp] = useState({ message: '', error: false });
    const [loader, setLoader] = useState(false);
    const [step, setStep] = useState(1);
    const countRef = useRef(null);
    const [timer, setTimer] = useState(30);
    const reSend = () => {
        const data = {
            ...inputs,
        };
        publicRequest.post('/auth/sendmail/forgotpassword', data).then((res) => {
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
    useEffect(() => {
        const logKey = (e) => {
            const keyCode = e.keyCode;
            if (keyCode === 13) {
                handleForgotPassword();
            }
            // code block
        };
        document.addEventListener('keyup', logKey);
        return () => {
            document.removeEventListener('keyup', logKey);
            setLoader();
            setStep();
        };
    }, []);
    const handleForgotPassword = (e) => {
        const data = {
            ...inputs,
        };
        setLoader(true);
        validate(data);
        switch (step) {
            case 1:
                if (regEmail.test(data.email) && data.email !== '') {
                    publicRequest.post('/auth/sendmail/forgotpassword', data).then((res) => {
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
                            setEmail({
                                ...email,
                                message: 'Email không chính xác',
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
                publicRequest.post('/auth/checkotp', data).then((res) => {
                    if (res.data) {
                        setTimer(30);
                        setStep(3);
                    } else {
                        setOtp({
                            message: 'Mã OTP không chính xác',
                            error: true,
                        });
                    }
                    setLoader(false);
                });
                break;
            case 3:
                if (regPassword.test(data.password) && data.password === data.rePassword) {
                    publicRequest.put('/auth/forgotpassword', data).then((res) => {
                        if (res.data) {
                            setInputs({});
                            setSwitchModal('login');
                            setStatus('Thay đổi mật khẩu thành công');
                        }
                        setLoader(false);
                    });
                }
                setLoader(false);
                break;
            default:
        }
    };
    return (
        <>
            <div className="paper-header">
                <ArrowBackIosIcon
                    onClick={() => {
                        setSwitchModal('login');
                        setInputs({});
                    }}
                />
                <ClearIcon onClick={closeModal} />
            </div>
            <PaperContent>
                <div className="title">
                    <p>Tìm lại mật khẩu</p>
                </div>
                <Form>
                    {step === 1 && (
                        <>
                            <Input
                                name="email"
                                label="Email"
                                type="email"
                                onChange={handleChange}
                                helperText={email.message}
                                error={email.error}
                                onFocus={() => {
                                    setEmail({
                                        ...email,
                                        message: '',
                                        error: false,
                                    });
                                }}
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
                                helperText={otp.message}
                                error={otp.error}
                                onFocus={() => {
                                    setOtp({
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
                    {step === 3 && (
                        <>
                            {' '}
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
                                type={rePassword ? 'text' : 'password'}
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
                            <Button fullWidth onClick={handleForgotPassword}>
                                {step === 3 ? 'Thay đổi mật khẩu' : 'Tiếp'}
                            </Button>
                        )}
                    </div>
                </Form>
            </PaperContent>
        </>
    );
};
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
const Form = styled.form`
    & > div {
        margin: 10px 0;
    }
    & > div:last-child {
        margin: 30px 0;
    }
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
