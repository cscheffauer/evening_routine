import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import './GoalsPage.css';

const useStyles = makeStyles(theme => ({
}));

const SettingsPage = () => {

    const classes = useStyles();
    return (
        <Fragment>
            <Box>
                <Typography variant="h4">
                    Your goals
                </Typography>
            </Box>
            <Box></Box>
        </Fragment>);
}

export default SettingsPage;
