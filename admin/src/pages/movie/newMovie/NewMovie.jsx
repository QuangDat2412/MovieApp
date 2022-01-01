/* eslint-disable react-hooks/exhaustive-deps */
import './newMovie.scss';
import '../../../assets/css/style.scss';
// import { useHistory } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../../redux/movieRedux/apiCalls';
import Input from '../../../components/input/Input';
import Select from '../../../components/select/Select';
import InputImg from '../../../components/inputImg/InputImg';
import FormInput from '../../../components/form/FormInput';
import { Button, Grid } from '@material-ui/core';

export default function NewMovie() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [inputs, setInputs] = useState({});
    const [status, setStatus] = useState();
    const handleArr = useCallback((e) => {
        const s = e.target.value.split(',');
        Object.keys(s).map((x) => {
            return (s[x] = s[x].trim());
        });
        setInputs((prev) => {
            return { ...prev, [e.target.name]: s };
        });
    }, []);

    const handleChange = useCallback((e) => {
        if (e.target.name === 'isSeries' || e.target.name === 'isVip') {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const newMovie = {
            ...inputs,
        };
        addMovie(newMovie, dispatch).then((response) => {
            if (response._id) {
                setStatus('Tao moi thanh cong');
            } else {
                setStatus('Tao moi that bai !!!');
            }
        });

        // history.push('/movies');
    };

    const Component1 = (
        <>
            <span>{status}</span>
            <Grid container spacing={2}>
                <Input type="text" name="title" placeholder="Thám tử lừng danh Conan" label="Tên phim" onChange={handleChange} required />
                <Input type="text" name="titleEng" placeholder="Detective Conan Movie" label="Tên tiếng anh" onChange={handleChange} />
                <Input type="number" name="year" placeholder="2021" label="Năm phát hành" onChange={handleChange} />
                <Input type="text" name="country" placeholder="Nhật Bản" label="Quốc gia" onChange={handleChange} />
                <Input type="text" multiline name="desc" placeholder="" label="Mô tả" maxRows={4} onChange={handleChange} />
                <Input type="text" name="actor" placeholder="Minami Hamabe, Shūichi Ikeda, Minami Takayama" label="Diễn viên" onChange={handleArr} />
                <Input type="text" name="director" placeholder="Chika Nagaoka" label="Đạo diễn" onChange={handleArr} />
                <Input type="text" name="genre" placeholder="Hoạt Hình, Chiếu Rạp, Anime" label="Thể loại" onChange={handleArr} />
                <Input type="number" name="trending" defaultValue="1" label="Trending" onChange={handleChange} />
                <Select
                    onChange={handleChange}
                    name="isSeries"
                    label="Is Series"
                    defaultValue="false"
                    options={useCallback({ Yes: 'true', No: 'false' }, [])}
                />
                <Select
                    onChange={handleChange}
                    name="isVip"
                    label="Is Vip"
                    defaultValue="false"
                    options={useCallback({ Yes: 'true', No: 'false' }, [])}
                />
                {inputs.isSeries ? (
                    <Input
                        type="number"
                        name="movieLength"
                        defaultValue={inputs.movieLength ? inputs.movieLength : 0}
                        label="Thời lượng"
                        onChange={handleChange}
                    />
                ) : (
                    ''
                )}
            </Grid>
            <InputImg
                setInputs={setInputs}
                inputs={inputs}
                onChange={handleChange}
                defaultValue="https://image.tmdb.org/t/p/w500//"
                name="imgTitle"
            />
            <InputImg
                setInputs={setInputs}
                inputs={inputs}
                onChange={handleChange}
                name="imgBanner"
                defaultValue="https://image.tmdb.org/t/p/original//"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" className="submit mt16 btn" onClick={handleSubmit}>
                Thêm mới
            </Button>
        </>
    );

    return (
        <>
            <FormInput label="Thêm mới phim" components={Component1} />
        </>
    );
}
