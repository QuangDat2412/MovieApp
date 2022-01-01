import { memo } from 'react';
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import '../../assets/css/style.scss';
import Input from '../input/Input';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';

const InputImg = ({ setInputs, inputs, onChange, name, defaultValue }) => {
    const [select, setSelect] = useState(true);
    const [statusUpload, setStatusUpload] = useState('');
    const [file, setFile] = useState(null);
    const handleSelect = (e) => {
        setSelect(e.target.value === 'true');
    };
    const handleUpload = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file?.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        setStatusUpload('Upload is paused');
                        break;
                    case 'running':
                        setStatusUpload('Upload is running');
                        break;
                    default:
                }
                setStatusUpload(`Upload is ${progress}% done`);
            },
            (error) => {
                setStatusUpload(`Upload is ${error}%`);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs({ ...inputs, [name]: downloadURL });
                });
            }
        );
    };
    return (
        <Grid container spacing={2} className="mt16">
            <Grid item sm={6} className="paper">
                <FormControl component="fieldset">
                    <FormLabel component="legend">{name}</FormLabel>
                    <h5>{!select ? (inputs[name] ? inputs[name] : defaultValue) : file ? file.name : defaultValue}</h5>
                    <span className="form-message">{statusUpload}</span>

                    <RadioGroup row defaultValue="true" name="controlled-radio-buttons-group" onChange={handleSelect}>
                        <FormControlLabel value="true" control={<Radio />} label="Chọn ảnh từ PC" />
                        <FormControlLabel value="false" control={<Radio />} label="Nhập link" />
                    </RadioGroup>
                </FormControl>
                {select ? (
                    <>
                        <input style={{ display: 'none' }} id="contained-button-file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Chọn file
                            </Button>
                        </label>
                        {file && (
                            <Button variant="contained" color="primary" component="span" onClick={handleUpload} className="btn">
                                Upload
                            </Button>
                        )}
                    </>
                ) : (
                    <Input type="text" placeholder="" name={name} defaultValue={defaultValue} onChange={onChange} label="Ảnh" />
                )}
            </Grid>

            <img
                src={select ? (file ? URL.createObjectURL(file) : defaultValue) : inputs[name] ? inputs[name] : defaultValue}
                alt=""
                className="showImg"
            />
        </Grid>
    );
};

export default memo(InputImg);
