import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';

import './InitialPage.css';
import { GOALS_ROUTE } from '../../../constants';

const useStyles = makeStyles(theme => ({
    //toolbar: theme.mixins.toolbar,
    heading: {
        marginTop: '10vh'
    },
    subline: {
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
        <Fragment>
            <Box className={classes.heading} textAlign="center">
                <Typography variant="h2">
                    Welcome to your Evening Routine
                </Typography>
            </Box>
            <Box className={classes.subline} textAlign="center">
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
        </Fragment>
    );
}

export default InitialPage;
