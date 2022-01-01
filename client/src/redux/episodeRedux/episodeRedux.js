import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../authRedux/authRedux';

const episodeSlice = createSlice({
    name: 'episode',
    initialState: {
        episodes: [],
        isFetching: false,
        error: false,
        status: '',
    },
    reducers: {
        getEpisodeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getEpisodeSuccess: (state, action) => {
            state.isFetching = false;
            state.episodes = action.payload;
        },
        getEpisodeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state, action) => {
            state.episodes = [];
            state.isFetching = false;
            state.error = false;
            state.status = '';
        });
    },
});

export const { getEpisodeStart, getEpisodeSuccess, getEpisodeFailure } = episodeSlice.actions;
export default episodeSlice.reducer;
