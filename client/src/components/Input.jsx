import { memo } from 'react';
import { TextField, InputAdornment, IconButton, Grid } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = (props) => {
    const { handleShowPassword, ...inputProps } = props;
    return (
        <Grid item sm={12}>
            <TextField
                {...inputProps}
                fullWidth
                variant="outlined"
                autoComplete="off"
                InputProps={
                    inputProps.name === 'password' || inputProps.name === 'rePassword' || inputProps.name === 'oldPassword'
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                          onClick={() => {
                                              handleShowPassword(inputProps.name);
                                          }}
                                      >
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
