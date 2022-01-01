import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, Grow } from '@material-ui/core';
import './login.scss';
import '../../assets/css/style.scss';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../../components/input/Input';
import LoadingSpin from 'react-loading-spin';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authRedux/apiCalls';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const state = useSelector((state) => state);
    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { ...inputs });
    };

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} sm={6}>
                        <Container component="main">
                            <Paper className="paper" elevation={3}>
                                {state.auth.isFetching && (
                                    <div className={'ExampleOfUsage'}>
                                        <LoadingSpin />
                                    </div>
                                )}
                                {!state.auth.isFetching && (
                                    <Avatar className="avatar">
                                        <LockOutlinedIcon />
                                    </Avatar>
                                )}
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <span>{state.auth.status}</span>
                                <form className="form">
                                    <Grid container spacing={2}>
                                        <Input name="email" label="Email" onChange={handleChange} type="email" />
                                        <Input
                                            name="password"
                                            label="Password"
                                            onChange={handleChange}
                                            type={showPassword ? 'text' : 'password'}
                                            handleShowPassword={handleShowPassword}
                                        />
                                    </Grid>
                                    <Button type="submit" fullWidth variant="contained" color="primary" className="submit mt32" onClick={handleClick}>
                                        Sign in
                                    </Button>
                                </form>
                            </Paper>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};
export default Login;
