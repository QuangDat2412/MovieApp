import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../authRedux/authRedux';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        isFetching: false,
        error: false,
        status: '',
    },
    reducers: {
        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.status = '';
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
            state.status = 'Lấy dữ liệu thành công';
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.status = 'Lấy dữ liệu thất bại';
        },
        //DELETE
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.status = '';
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex((item) => item._id === action.payload),
                1
            );
            state.status = 'Xóa thành công';
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.status = 'Xóa thất bại';
        },
        //UPDATE
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.status = '';
        },
        updateUserSuccess: (state) => {
            state.isFetching = false;
            state.status = 'Cập nhật thành công';
            state.error = false;
        },
        updateUserFailure: (state) => {
            state.status = 'Email da ton tai';
            state.isFetching = false;
            state.error = true;
        },
        addNewUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.status = '';
        },
        addNewUserSuccess: (state, action) => {
            state.status = 'Thêm mới thành công';
            state.isFetching = false;
            state.users.push(action.payload);
        },
        addNewUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.status = 'Thêm mới thất bại';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state, action) => {
            state.users = [];
            state.isFetching = false;
            state.error = false;
            state.status = '';
        });
    },
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    addNewUserStart,
    addNewUserSuccess,
    addNewUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
