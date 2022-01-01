import {
    loginFailure,
    loginStart,
    loginSuccess,
    logOut,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    registerStart,
    registerSuccess,
    registerFailure,
} from './authRedux';
import { publicRequest, userRequest } from '../../requestMethods';

//Register
export const register = async (newUser, dispatch) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post('/auth/register', newUser);
        dispatch(registerSuccess());
        return res.data;
    } catch (err) {
        dispatch(registerFailure());
    }
};
// Login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
        return res.data;
    } catch (err) {
        dispatch(loginFailure());
        return err;
    }
};
// Logout
export const logout = async (dispatch) => {
    dispatch(logOut());
};

export const updateUser = async (id, updateUser, dispatch) => {
    dispatch(updateUserStart());

    try {
        // update
        await userRequest.put(`/users/${id}`, updateUser);
        dispatch(updateUserSuccess(updateUser));
    } catch (err) {
        dispatch(updateUserFailure(err));
    }
};
