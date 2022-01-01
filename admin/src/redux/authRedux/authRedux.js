import { createSlice } from '@reduxjs/toolkit';
// state,action
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
        loginNoAdmin: (state) => {
            state.isFetching = false;
            state.error = true;
            state.status = 'Tai khoan khong phai Admin';
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
        updateCurrentUser: (state, action) => {
            if (action.payload.id === state.currentUser._id) {
                Object.keys(action.payload.updateUser).map((key) => {
                    state.currentUser[key] = action.payload.updateUser[key];
                    return 0;
                });
            }
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, loginNoAdmin, logOut, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;
