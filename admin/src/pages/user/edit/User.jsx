/* eslint-disable react-hooks/exhaustive-deps */
import { MailOutline, PermIdentity, PhoneAndroid } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/userRedux/apiCalls';
import { Button, Grid } from '@material-ui/core';
import Input from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import InputImg from '../../../components/inputImg/InputImg';
import FormInput from '../../../components/form/FormInput';

import './user.scss';
import '../../../assets/css/style.scss';

export default function User() {
    const [inputs, setInputs] = useState({});
    const initialState = { message: '', error: false, validate: true };
    const [checkEmail, setCheckEmail] = useState(initialState);
    const [checkPassword, setCheckPassword] = useState(initialState);
    const dispatch = useDispatch();
    const location = useLocation();
    const userId = location.pathname.split('/')[2];
    const state = useSelector((state) => state);
    const user = state.user.users.find((user) => user._id === userId);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = useCallback(() => setShowPassword(!showPassword), []);

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
    const validate = (e) => {
        switch (e.target.name) {
            case 'email':
                const re =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const mail = e.target.value;
                if (mail !== '') {
                    setCheckEmail({
                        message: re.test(mail) ? '' : 'Trường này không phải là email',
                        error: re.test(mail) ? false : true,
                        validate: re.test(String(mail)),
                    });
                } else {
                    setCheckEmail(initialState);
                }

                break;
            case 'password':
                const password = e.target.value;
                if (password !== '') {
                    setCheckPassword({
                        message: password.length >= 6 ? '' : `Vui lòng nhập đủ 6 ký tự`,
                        error: password.length >= 6 ? false : true,
                        validate: password.length >= 6,
                    });
                } else {
                    setCheckPassword(initialState);
                }
                break;
            default:
            // code block
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userUpdate = {
            ...inputs,
        };
        Object.keys(userUpdate).map((key) => {
            if (userUpdate[key] === '') {
                delete userUpdate[key];
            }
            return 0;
        });
        updateUser(userId, userUpdate, dispatch);
    };
    const Component = (
        <>
            <Grid container spacing={2}>
                <Input type="text" placeholder="Dat Quang" name="fullName" onChange={handleChange} label="Full Name" />
                <Input
                    type="email"
                    placeholder="Dat Quang"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    helperText={checkEmail.message}
                    error={checkEmail.error}
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
                />
                <Input type="text" placeholder="+1 123 456 78" name="phone" onChange={handleChange} label="Phone" />

                <Select
                    onChange={handleChange}
                    name="isAdmin"
                    label="Is Admin"
                    defaultValue={String(user.isAdmin)}
                    options={useCallback({ Yes: 'true', No: 'false' }, [])}
                />
            </Grid>
            <InputImg setInputs={setInputs} inputs={inputs} onChange={handleChange} name="img" />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit mt16 btn"
                onClick={handleSubmit}
                disabled={!(checkEmail.validate && checkPassword.validate)}
            >
                Submit
            </Button>
        </>
    );

    return (
        <div className="main">
            <div className="titleContainer">
                <h1>Edit User</h1>
                {state.user.error && <span>{state.user.status}</span>}
                <Link to="/newUser">
                    <button className="addButton">Create</button>
                </Link>
            </div>
            <Grid container justifyContent="center" alignItems="stretch">
                <div className="showInfoContainer">
                    <div>
                        <img src={user.img} alt="" className="userShowImg" />
                        <div className="showTopTitle">
                            <span className="showName">{user.fullName}</span>
                        </div>
                    </div>
                    <div>
                        <span className="showTitle">Account Details</span>
                        <div className="showInfoItem">
                            <PermIdentity className="userShowIcon" />
                        </div>
                        <div className="showInfoItem">
                            <span className="showInfoTitle">IsAdmin: {user.isAdmin ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="showInfoItem">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="showInfoTitle">{user.phone}</span>
                        </div>
                        <div className="showInfoItem">
                            <MailOutline className="userShowIcon" />
                            <span className="showInfoTitle">{user.email}</span>
                        </div>
                    </div>
                </div>
                <FormInput label="Edit User" components={Component} />
            </Grid>
        </div>
    );
}
