import { createSlice } from '@reduxjs/toolkit';

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
    },
});

export const { getMovieStart, getMovieSuccess, getMovieFailure } = movieSlice.actions;
export default movieSlice.reducer;
