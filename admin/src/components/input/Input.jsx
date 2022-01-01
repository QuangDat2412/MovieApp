import { memo } from 'react';
import { TextField, InputAdornment, IconButton, Grid } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = (props) => {
    const { handleShowPassword, ...inputProps } = props;
    return (
        <Grid item sm={6}>
            <TextField
                {...inputProps}
                fullWidth
                variant="outlined"
                InputProps={
                    inputProps.name === 'password'
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton onClick={handleShowPassword}>
                                          {inputProps.type === 'password' ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }
                        : null
                }
            />
        </Grid>
    );
};

export default memo(Input);
