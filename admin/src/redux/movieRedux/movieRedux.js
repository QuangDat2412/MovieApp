import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../authRedux/authRedux';

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: [],
        isFetching: false,
        error: false,
        status: '',
    },
    reducers: {
        getMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies = action.payload;
        },
        getMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies.splice(
                state.movies.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },

        updateMovieSuccess: (state, action) => {
            state.isFetching = false;
        },
        updateMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        addNewMovieStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addNewMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.movies.push(action.payload);
        },
        addNewMovieFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state, action) => {
            state.movies = [];
            state.isFetching = false;
            state.error = false;
            state.status = '';
        });
    },
});

export const {
    getMovieStart,
    getMovieSuccess,
    getMovieFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    deleteMovieFailure,
    updateMovieStart,
    updateMovieSuccess,
    updateMovieFailure,
    addNewMovieStart,
    addNewMovieSuccess,
    addNewMovieFailure,
} = movieSlice.actions;
export default movieSlice.reducer;
