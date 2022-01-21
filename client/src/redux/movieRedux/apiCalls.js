import { getMovieStart, getMovieSuccess, getMovieFailure } from './movieRedux';
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
