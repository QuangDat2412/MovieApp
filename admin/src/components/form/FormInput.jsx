import { memo } from 'react';

import { Grid, Typography, Paper, Grow } from '@material-ui/core';
import '../../assets/css/style.scss';
const FormInput = ({ label, components }) => {
    return (
        <Grow in className="grow">
            <Grid item sm={10}>
                <Paper elevation={3} className="paper">
                    <Typography component="h1" variant="h5">
                        {label}
                    </Typography>
                    <form className="form">{components}</form>
                </Paper>
            </Grid>
        </Grow>
    );
};

export default memo(FormInput);
