import React, { useState } from 'react';
import { Button, Grid, Container, Grow } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import Login from '../login/Login';
import '../../assets/css/style.scss';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
        borderRadius: '30px',
        marginRight: '50%',
        '&:hover': {
            backgroundColor: pink[700],
        },
    },
}))(Button);

export default function Dashboard() {
    const [re, setRe] = useState(false);

    return (
        <>
            {re === true ? (
                <>
                    <div
                        className="shadow"
                        onClick={() => {
                            setRe(!re);
                        }}
                    ></div>
                    <div
                        className="X"
                        onClick={() => {
                            setRe(!re);
                        }}
                    >
                        <CloseIcon style={{ fontSize: 25 }} />
                    </div>
                    <Login />
                </>
            ) : (
                <Grow in>
                    <Container>
                        <Grid container justifyContent="center" alignItems="stretch" style={{ marginTop: '35%' }}>
                            <ColorButton
                                variant="contained"
                                startIcon={<DashboardIcon />}
                                onClick={() => {
                                    setRe(!re);
                                }}
                            >
                                login
                            </ColorButton>
                        </Grid>
                    </Container>
                </Grow>
            )}
        </>
    );
}
