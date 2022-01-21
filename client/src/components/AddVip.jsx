import Button from '../components/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { useDispatch } from 'react-redux';
import { updateUserSuccess } from '../redux/authRedux/authRedux';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethods';

const AddVip = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => {
        return state.auth.currentUser;
    });
    const handleAdd = async () => {
        if (!auth?._id) {
            props.setOpenModal(true);
        }
        const res = auth?._id && (await userRequest.put(`/users/add/${auth?._id}`, { favorites: props.movie?._id }));
        auth?._id && dispatch(updateUserSuccess(res.data));
    };
    const handleRemove = async () => {
        const res = await userRequest.put(`/users/remove/${auth?._id}`, { favorites: props.movie?._id });
        dispatch(updateUserSuccess(res.data));
    };
    return (
        <>
            {auth?.favorites.filter((m) => m._id === props.movie?._id)[0]?._id ? (
                <Button onClick={handleRemove}>
                    <PlaylistAddCheckIcon style={{ marginRight: '10px' }} /> {props.string?.remove}
                </Button>
            ) : (
                <Button onClick={handleAdd}>
                    <PlaylistAddIcon style={{ marginRight: '10px' }} /> {props.string?.add}
                </Button>
            )}
        </>
    );
};
export default memo(AddVip);
