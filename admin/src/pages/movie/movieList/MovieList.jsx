import './movieList.scss';
import '../../../assets/css/style.scss';

import { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMovie, getMovies } from '../../../redux/movieRedux/apiCalls';
import LoadingSpin from 'react-loading-spin';

export default function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movie.movies);

    const [open, setOpen] = useState(false);
    const [openID, setOpenID] = useState(false);
    const [ids, setids] = useState([]);
    const isFetching = useSelector((state) => state.user.isFetching);
    // const isFetching = 1;
    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);
    const handleDelete = (id) => {
        deleteMovie(id, dispatch);
    };
    const multipleDelete = (ids) => {
        ids.map((id) => {
            deleteMovie(id, dispatch);
            return 0;
        });
    };
    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'title', headerName: 'Tên phim', width: 200 },
        { field: 'movieLength', headerName: 'Thời lượng', width: 150 },
        { field: 'isSeries', headerName: 'Is Series', width: 150 },
        {
            field: 'edit',
            headerName: 'Sửa',
            width: 130,
            renderCell: (params) => {
                return (
                    <Link to={'/movie/' + params.row.slug}>
                        <button className="editBtn">Edit</button>
                    </Link>
                );
            },
        },
        {
            field: 'delete',
            headerName: 'Xóa',
            width: 150,
            renderCell: (params) => {
                const handleOpen = (e) => {
                    setOpenID(e.target.dataset.id);
                    setOpen(true);
                };
                const handleClose = () => setOpen(false);
                if (open && openID === params.row._id) {
                    return (
                        <>
                            <button
                                onClick={() => {
                                    handleDelete(openID);
                                }}
                                data-id={params.row._id}
                                className="deleteBtn"
                            >
                                Yes
                            </button>
                            <button onClick={handleClose} className="editBtn">
                                No
                            </button>
                        </>
                    );
                } else {
                    return (
                        <button onClick={handleOpen} className="deleteBtn" data-id={params.row._id}>
                            Delete
                        </button>
                    );
                }
            },
        },
    ];

    return (
        <div className="userList">
            {isFetching && (
                <div className={'ExampleOfUsage'}>
                    <LoadingSpin />
                </div>
            )}
            {!isFetching && (
                <>
                    <button
                        onClick={() => {
                            multipleDelete(ids);
                        }}
                        className="deleteBtn"
                    >
                        Delete
                    </button>
                    <DataGrid
                        className="gridList"
                        rows={movies}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        checkboxSelection
                        onSelectionModelChange={(itm) => setids(itm)}
                    />
                </>
            )}
        </div>
    );
}
