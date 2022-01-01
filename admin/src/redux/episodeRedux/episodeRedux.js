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
        //DELETE
        deleteEpisodeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteEpisodeSuccess: (state, action) => {
            state.isFetching = false;
            state.episodes.splice(
                state.episodes.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteEpisodeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateEpisodeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateEpisodeSuccess: (state, action) => {
            state.isFetching = false;
        },
        updateEpisodeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        addNewEpisodeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addNewEpisodeSuccess: (state, action) => {
            state.isFetching = false;
            state.episode.push(action.payload);
        },
        addNewEpisodeFailure: (state) => {
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

export const {
    getEpisodeStart,
    getEpisodeSuccess,
    getEpisodeFailure,
    deleteEpisodeStart,
    deleteEpisodeSuccess,
    deleteEpisodeFailure,
    updateEpisodeStart,
    updateEpisodeSuccess,
    updateEpisodeFailure,
    addNewEpisodeStart,
    addNewEpisodeSuccess,
    addNewEpisodeFailure,
} = episodeSlice.actions;
export default episodeSlice.reducer;
