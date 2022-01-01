/* eslint-disable react-hooks/exhaustive-deps */
import './newUser.scss';
import '../../../assets/css/style.scss';

import { useHistory } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addNewUser, getUsers } from '../../../redux/userRedux/apiCalls';
import Input from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import InputImg from '../../../components/inputImg/InputImg';
import FormInput from '../../../components/form/FormInput';
import { useSelector } from 'react-redux';

import { Button, Grid } from '@material-ui/core';

export default function NewUser() {
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputs, setInputs] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    // const [select, setSelect] = useState(true);
    const initialState = { message: '', error: false, validate: false };
    const [checkEmail, setCheckEmail] = useState(initialState);
    const [checkPassword, setCheckPassword] = useState(initialState);
    const validate = (e) => {
        switch (e.target.name) {
            case 'email':
                const re =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const mail = e.target.value;
                const checkMail = users.filter((user) => {
                    return user.email === mail;
                });
                if (mail === '') {
                    setCheckEmail({ message: 'Vui lòng nhập email', error: true, validate: false });
                } else {
                    const myPromise = new Promise((resolve) => {
                        setCheckEmail({
                            message: re.test(mail) ? '' : 'Trường này không phải là email',
                            error: re.test(mail) ? false : true,
                            validate: false,
                        });
                        resolve({
                            message: re.test(String(mail)) ? '' : 'Trường này không phải là email',
                            error: re.test(mail) ? false : true,
                        });
                    });

                    myPromise.then((data) => {
                        setCheckEmail({
                            message: checkMail.length === 0 ? data.message : 'Email đã tồn tai',
                            error: checkMail.length === 0 ? data.error : true,
                            validate: checkMail.length === 0 && re.test(String(mail)),
                        });
                    });
                }

                break;
            case 'password':
                const password = e.target.value;
                if (password === '') {
                    setCheckPassword({
                        message: 'Vui lòng nhập password',
                        error: true,
                        validate: false,
                    });
                } else {
                    setCheckPassword({
                        message: password.length >= 6 ? '' : `Vui lòng nhập đủ 6 ký tự`,
                        error: password.length >= 6 ? false : true,
                        validate: password.length >= 6,
                    });
                }
                break;
            default:
            // code block
        }
    };
    const handleChange = useCallback((e) => {
        if (e.target.name === 'isAdmin') {
            setInputs((prev) => {
                return { ...prev, [e.target.name]: e.target.value === 'true' };
            });
        } else {
            setInputs((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
            });
        }
        validate(e);
    }, []);

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            ...inputs,
        };
        addNewUser(newUser, dispatch);
        getUsers(dispatch);

        history.push('/users');
    };
    const Component = (
        <>
            <Grid container spacing={2}>
                <Input type="text" placeholder="Dat Quang" name="fullName" onChange={handleChange} label="Full Name" />
                <Input
                    type="email"
                    placeholder="abc@gmail.com"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    helperText={checkEmail.message}
                    error={checkEmail.error}
                    required
                />
                <Input
                    label="Password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    handleShowPassword={handleShowPassword}
                    helperText={checkPassword.message}
                    error={checkPassword.error}
                    required
                />
                <Input type="text" placeholder="+1 123 456 78" name="phone" onChange={handleChange} label="Phone" />
                <Select
                    onChange={handleChange}
                    name="isAdmin"
                    label="Is Admin"
                    defaultValue="false"
                    options={useCallback({ Yes: 'true', No: 'false' }, [])}
                />
            </Grid>
            <InputImg setInputs={useCallback({ setInputs }, [])} inputs={useCallback({ inputs }, [])} onChange={handleChange} name="img" />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit mt16 btn"
                onClick={handleSubmit}
                disabled={!(checkEmail.validate && checkPassword.validate)}
            >
                Thêm mới
            </Button>
        </>
    );
    return <FormInput label="New User" components={Component} />;
}
