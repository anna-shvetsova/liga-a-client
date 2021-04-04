import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@material-ui/core';
import { VisibilityTwoTone, FaceTwoTone } from '@material-ui/icons';

const MainPage = () => {
    const { _id, name, surname, role } = useSelector(state => state);
    const text = (_id) ? `Hello ${name} ${surname}` : 'Authenticate please';
    return (
        <Grid container direction='column' alignItems='center'>
            <Box mt={.2} mb={.2}>
                {_id && (role === 'admin') && <VisibilityTwoTone color='primary' fontSize='large' />}
                {_id && (role === 'user') && <FaceTwoTone color='primary' fontSize='large' />}
            </Box>
            <Typography component='p'>{text}</Typography>
        </Grid>
    )
}

export default MainPage;