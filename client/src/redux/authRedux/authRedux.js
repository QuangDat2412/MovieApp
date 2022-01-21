import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        status: '',
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.status = 'Login';
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.status = 'Tai khoan hoac mat khau khong chinh xac';
        },
        logOut: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            state.status = '';
        },
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.status = '';
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.status = 'Cập nhật thành công';
            state.error = false;
            state.currentUser = action.payload;
        },
        updateUserFailure: (state) => {
            state.status = 'Email da ton tai';
            state.isFetching = false;
            state.error = true;
        },
        registerStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.status = '';
        },
        registerSuccess: (state) => {
            state.status = 'Đăng ký thành công';
            state.isFetching = false;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.status = 'Đăng ký thất bại';
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logOut,
    updateCurrentUser,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    registerStart,
    registerSuccess,
    registerFailure,
} = authSlice.actions;
export default authSlice.reducer;
