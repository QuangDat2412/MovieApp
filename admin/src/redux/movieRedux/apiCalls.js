import {
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
} from './movieRedux';
import { userRequest } from '../../requestMethods';

// GET Movie

export const getMovies = async (dispatch) => {
    dispatch(getMovieStart());
    try {
        const res = await userRequest.get('/movies');
        dispatch(getMovieSuccess(res.data));
    } catch (err) {
        dispatch(getMovieFailure());
    }
};
// DELETE Movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await userRequest.delete(`/movies/${id}`);
        await userRequest.delete(`/episodes/movie/${id}`);
        dispatch(deleteMovieSuccess(id));
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
};
// Update Movie
export const updateMovie = async (id, updateMovie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        // update
        await userRequest.put(`/movies/${id}`, updateMovie);
        dispatch(updateMovieSuccess({ id, updateMovie }));
    } catch (err) {
        dispatch(updateMovieFailure());
    }
};
// Add New Movie
export const addMovie = async (movie, dispatch) => {
    dispatch(addNewMovieStart());
    try {
        const res = await userRequest.post(`/movies`, movie);
        dispatch(addNewMovieSuccess(res.data));
        return res.data;
    } catch (err) {
        dispatch(addNewMovieFailure());
        return err;
    }
};
