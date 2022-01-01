import { loginFailure, loginStart, loginSuccess, loginNoAdmin, logOut } from './authRedux';

import { publicRequest } from '../../requestMethods';
// Login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        if (res.data.isAdmin) {
            dispatch(loginSuccess(res.data));
        } else {
            dispatch(loginNoAdmin());
        }
    } catch (err) {
        dispatch(loginFailure());
    }
};
// Logout
export const logout = async (dispatch) => {
    dispatch(logOut());
};
