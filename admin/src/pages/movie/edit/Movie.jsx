/* eslint-disable react-hooks/exhaustive-deps */
import './movie.scss';
import '../../../assets/css/style.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import FormInput from '../../../components/form/FormInput';
import { Button, Grid } from '@material-ui/core';
import InputImg from '../../../components/inputImg/InputImg';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../../../components/select/Select';
import { updateMovie, getMovies } from '../../../redux/movieRedux/apiCalls';

export default function Movie() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { slug } = useParams();
    const movie = useSelector((state) => {
        return state.movie.movies.find((movie) => movie.slug === slug);
    });
    const [inputs, setInputs] = useState(movie);
    const handleChange = useCallback((e) => {
        if (e.target.name === 'isSeries') {
            setInputs((prev) => {
                return { ...prev, [e.target.name]: e.target.value === 'true' };
            });
        }
        if (!inputs.isSeries) {
            setInputs((prev) => {
                return { ...prev, movieLength: '1' };
            });
        }
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const handleArr = useCallback((e) => {
        const s = e.target.value.split(',');
        Object.keys(s).map((x) => {
            return (s[x] = s[x].trim());
        });
        setInputs((prev) => {
            return { ...prev, [e.target.name]: s };
        });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const movieUpdate = {
            ...inputs,
        };

        Object.keys(movieUpdate).map((x) => {
            const a = movie[x];
            const b = movieUpdate[x];
            if (x === 'movieLength' && a === parseInt(b)) {
                delete movieUpdate['listMovie'];
                delete movieUpdate[x];
            }
            if (a === b) {
                delete movieUpdate[x];
            }
            return 0;
        });
        const messAlert = Object.keys(movieUpdate).reduce((previousValue, currentValue) => {
            if (previousValue === '') {
                return previousValue + currentValue;
            } else {
                return previousValue + `, ${currentValue}`;
            }
        }, '');
        alert(messAlert);
        updateMovie(movie._id, movieUpdate, dispatch);
        getMovies(dispatch);

        history.push('/movies');
    };
    const Component = (
        <>
            <Grid container spacing={2}>
                <Input type="text" name="titleEng" label="Ten tieng anh" onChange={handleChange} defaultValue={movie.titleEng} />
                <Input type="number" name="year" label="Nam san xuat" onChange={handleChange} defaultValue={movie.year} />
                <Input type="text" name="country" label="Quoc gia" onChange={handleChange} defaultValue={movie.country} />
                <Input type="text" multiline name="desc" label="Mo ta" maxRows={4} onChange={handleChange} defaultValue={movie.desc} />
                <Input type="text" name="director" label="Dao dien" onChange={handleArr} defaultValue={movie.director.toString()} />
                <Input type="text" name="actor" label="Dien Vien" onChange={handleArr} defaultValue={movie.actor.toString()} />
                <Input type="text" name="genre" label="The loai" onChange={handleArr} defaultValue={movie.genre.toString()} />
                <Input type="number" name="trending" defaultValue={movie.trending} label="Trending" onChange={handleChange} />
                <Select
                    onChange={handleChange}
                    name="isVip"
                    label="Is Vip"
                    defaultValue={String(movie.isVip)}
                    options={useCallback({ Yes: 'true', No: 'false' }, [])}
                />
                <Select
                    onChange={handleChange}
                    name="isSeries"
                    label="Is Series"
                    defaultValue={String(movie.isSeries)}
                    options={useCallback({ Yes: 'true', No: 'false' }, [])}
                />
                {inputs.isSeries ? (
                    <Input type="number" name="movieLength" defaultValue={movie.movieLength} label="Do dai phim" onChange={handleChange} />
                ) : (
                    ''
                )}
            </Grid>
            <InputImg setInputs={setInputs} inputs={inputs} onChange={handleChange} name="imgTitle" defaultValue={movie.imgTitle} />
            <InputImg setInputs={setInputs} inputs={inputs} onChange={handleChange} name="imgBanner" defaultValue={movie.imgBanner} />
            <Button type="submit" fullWidth variant="contained" color="primary" className="submit btn" onClick={handleSubmit}>
                Submit
            </Button>
        </>
    );
    return (
        <div className="main">
            <div className="titleContainer">
                <h1>Edit Movie</h1>
                <Link to={`/episode/${movie.slug}`}>
                    <button className="addButton">Edit Episode</button>
                </Link>
            </div>
            <Grid container justifyContent="center" alignItems="stretch">
                <FormInput label="Edit Movie" components={Component} />
            </Grid>
        </div>
    );
}
