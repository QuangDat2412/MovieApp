import {
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
} from './userRedux';

import { publicRequest, userRequest } from '../../requestMethods';
import { updateCurrentUser } from '../authRedux/authRedux';

// Get User
export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await userRequest.get('/users');
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
};

// Delete User
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};
// Update User
export const updateUser = async (id, updateUser, dispatch) => {
    dispatch(updateUserStart());
    try {
        // update
        await userRequest.put(`/users/${id}`, updateUser);
        dispatch(updateUserSuccess());
        dispatch(updateCurrentUser({ id, updateUser }));
    } catch (err) {
        dispatch(updateUserFailure(err));
    }
};
// Add new User
export const addNewUser = async (newUser, dispatch) => {
    dispatch(addNewUserStart());
    try {
        const res = await publicRequest.post('/auth/register', newUser);
        dispatch(addNewUserSuccess(res.data));
    } catch (err) {
        dispatch(addNewUserFailure());
    }
};
