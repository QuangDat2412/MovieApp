import './episode.scss';
import '../../../assets/css/style.scss';

import { useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import FormInput from '../../../components/form/FormInput';
import { Button, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEpisode, getEpisodes, deleteEpisode, updateEpisode } from '../../../redux/episodeRedux/apiCalls';
import { DataGrid } from '@material-ui/data-grid';
import InputImg from '../../../components/inputImg/InputImg';

export default function Episode() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openID, setOpenID] = useState(false);
    const [action, setAction] = useState(true);
    const [indexEpisode, setIndexEpisode] = useState();
    const [ids, setIds] = useState([]);
    const multipleDelete = (ids) => {
        ids.map((id) => {
            deleteEpisode(id, dispatch);
            return 0;
        });
    };
    const handleDelete = (id) => {
        deleteEpisode(id, dispatch);
    };
    const movie = useSelector((state) => {
        return state.movie?.movies.find((movie) => movie?.slug === slug);
    });
    const episodes = useSelector((state) => state.episode.episodes);

    const [value, setValue] = useState(1);
    const [inputs, setInputs] = useState({
        episode: 0,
    });
    const [videos, setVideos] = useState({
        '1080p': '',
        '720p': '',
        '480p': '',
        '360p': '',
    });
    useEffect(() => {
        getEpisodes(movie?._id, dispatch);
    }, [dispatch, movie]);
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleVideo = (e) => {
        setVideos((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleAdd = (e) => {
        e.preventDefault();
        let movieAdd = {};
        if (movie?.isSeries) {
            movieAdd = {
                ...inputs,
                movieId: movie?._id,
                video: videos,
            };
        } else {
            movieAdd = {
                ...inputs,
                movieId: movie?._id,
                episode: 0,
                video: videos,
            };
        }

        addEpisode(movieAdd, dispatch);
        getEpisodes(movie?._id, dispatch);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const movieUpdate = {
            ...inputs,
        };
        updateEpisode(movieUpdate, dispatch);
    };
    const Add = (
        <>
            <Grid container spacing={2}>
                {movie?.isSeries && (
                    <Input
                        type="number"
                        name="episode"
                        label="Tap"
                        onChange={(e) => {
                            const newValue = Math.min(Math.max(e.target.value, 1), movie?.movieLength);
                            setValue(newValue);
                            setInputs((prev) => {
                                return { ...prev, [e.target.name]: e.target.value };
                            });
                        }}
                        value={value}
                    />
                )}
                <Input type="text" name="1080p" label="1080p" onChange={handleVideo} />
                <Input type="text" name="720p" label="720p" onChange={handleVideo} />
                <Input type="text" name="480p" label="480p" onChange={handleVideo} />
                <Input type="text" name="360p" label="360p" onChange={handleVideo} />
                <Input type="text" name="trailer" label="Link trailer" onChange={handleChange} />
                <InputImg setInputs={setInputs} inputs={inputs} onChange={handleChange} name="banner" />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className="submit btn" onClick={handleAdd}>
                Add
            </Button>
        </>
    );
    const Update = (
        <>
            <Grid container spacing={2}>
                <Input type="text" name="1080p" label="1080p" onChange={handleVideo} defaultValue={indexEpisode?.video['1080p']} />
                <Input type="text" name="720p" label="720p" onChange={handleVideo} defaultValue={indexEpisode?.video['720p']} />
                <Input type="text" name="480p" label="480p" onChange={handleVideo} defaultValue={indexEpisode?.video['480p']} />
                <Input type="text" name="360p" label="360p" onChange={handleVideo} defaultValue={indexEpisode?.video['360p']} />
                <Input type="text" name="trailer" label="Link trailer" onChange={handleChange} defaultValue={indexEpisode?.trailer} />
                <InputImg setInputs={setInputs} inputs={inputs} onChange={handleChange} name="banner" />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className="submit btn" onClick={handleUpdate}>
                Update
            </Button>
        </>
    );
    const columns = [
        { field: 'episode', headerName: 'Tap', width: 200 },
        {
            field: 'edit',
            headerName: 'Sửa',
            width: 130,
            renderCell: (params) => {
                return (
                    <button
                        className="editBtn"
                        onClick={() => {
                            setAction(false);
                            const episode = episodes.find((episode) => episode.episode === params.row.episode);
                            setIndexEpisode(episode);
                            console.log(episode.episode);
                        }}
                    >
                        Edit
                    </button>
                );
            },
        },
        {
            field: 'delete',
            headerName: 'Delete',
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
        <div className="main">
            <div className="titleContainer">
                <h1>{movie?.title}</h1>
            </div>
            <div>
                <button
                    onClick={() => {
                        multipleDelete(ids);
                    }}
                    className="deleteBtn action"
                >
                    Delete
                </button>
                <button
                    onClick={() => {
                        setAction(true);
                    }}
                    className="action"
                >
                    Add
                </button>
            </div>
            <div className="a">
                <DataGrid
                    rows={episodes}
                    disableSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row._id}
                    checkboxSelection
                    onSelectionModelChange={(itm) => setIds(itm)}
                />
            </div>
            <Grid container justifyContent="center" alignItems="stretch">
                {action ? <FormInput label="Thêm tập phim" components={Add} /> : ''}
                {!action ? <FormInput label="Update" components={Update} /> : ''}
            </Grid>
        </div>
    );
}
