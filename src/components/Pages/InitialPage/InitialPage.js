import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import './InitialPage.css';
import { GOALS_ROUTE } from '../../../constants';

const useStyles = makeStyles(theme => ({
    //toolbar: theme.mixins.toolbar,
    boxHeading: {
        marginTop: '10vh'
    },
    boxSubline: {
        marginTop: '5vh'
    },
    link: {
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none',
        }
    }
}));


const InitialPage = (props) => {
    const classes = useStyles();
    const { onRouteChange } = props;
    return (
        <Container>
            <Box className={classes.boxHeading} textAlign="center">
                <Typography variant="h2">
                    Welcome to your Evening Routine
                </Typography>
            </Box>
            <Box className={classes.boxSubline} textAlign="center">
                <Typography variant="h4">
                    To start your evening routine, please fulfill your <Link className={classes.link} onClick={() => onRouteChange(GOALS_ROUTE)}>goals</Link> first.
                </Typography>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    startIcon={<PlayCircleOutlineIcon />}
                >
                    Start
                </Button>
            </Box>
        </Container>
    );
}

export default InitialPage;
