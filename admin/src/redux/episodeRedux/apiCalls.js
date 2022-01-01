import {
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
} from './episodeRedux';
import { userRequest } from '../../requestMethods';

// GET Episodes
export const getEpisodes = async (id, dispatch) => {
    dispatch(getEpisodeStart());
    try {
        const res = await userRequest.get('/episodes');
        const result = res.data.filter((word) => word.movieId === id);
        dispatch(getEpisodeSuccess(result));
    } catch (err) {
        dispatch(getEpisodeFailure());
    }
};
// DELETE Episodes
export const deleteEpisode = async (id, dispatch) => {
    dispatch(deleteEpisodeStart());
    try {
        await userRequest.delete(`/episodes/${id}`);
        dispatch(deleteEpisodeSuccess(id));
    } catch (err) {
        dispatch(deleteEpisodeFailure());
    }
};
// Update Episodes
export const updateEpisode = async (id, updateEpisode, dispatch) => {
    dispatch(updateEpisodeStart());
    try {
        // update
        await userRequest.put(`/episodes/${id}`, updateEpisode);
        dispatch(updateEpisodeSuccess({ id, updateEpisode }));
    } catch (err) {
        dispatch(updateEpisodeFailure());
    }
};
// Add New Episodes
export const addEpisode = async (episode, dispatch) => {
    dispatch(addNewEpisodeStart());
    try {
        const res = await userRequest.post(`/episodes`, episode);
        dispatch(addNewEpisodeSuccess(res.data));
    } catch (err) {
        dispatch(addNewEpisodeFailure());
    }
};
