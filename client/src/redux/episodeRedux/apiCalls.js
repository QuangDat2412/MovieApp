import { getEpisodeStart, getEpisodeSuccess, getEpisodeFailure } from './episodeRedux';
import { userRequest } from '../../requestMethods';

// GET Episodes
export const getEpisodes = async (id, dispatch) => {
    dispatch(getEpisodeStart());
    try {
        const res = await userRequest.get('/episodes');
        const newRes = res.data.map((x) => {
            const { video, ...others } = x;
            return others;
        });
        const result = newRes.filter((word) => word.movieId === id);
        if (id === '') {
            dispatch(getEpisodeSuccess(newRes));
        } else {
            dispatch(getEpisodeSuccess(result));
        }
    } catch (err) {
        dispatch(getEpisodeFailure());
    }
};
