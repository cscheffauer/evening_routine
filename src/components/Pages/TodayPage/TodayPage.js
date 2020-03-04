import React, { Fragment } from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    //toolbar: theme.mixins.toolbar,
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            height: '80vh',
        },
        [theme.breakpoints.up('md')]: {
            height: '85vh',
        }
    },
    button: {},
    boxButton: {
        display: 'flex',
        justifyContent: 'center'
    },
    backdropRoutine: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    containerRoutine: {
        maxWidth: 1600
    },
    paperRoutine: {
        height: '90vh',
    },
    buttonCloseRoutine: {
        float: 'right',
        marginTop: 5,
        marginRight: 5,
    }
}));


const TodayPage = (props) => {
    const { goals, darkMode } = props;
    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const handleCloseBackDrop = () => {
        setOpenBackdrop(false);
    };
    const handleOpenBackDrop = () => {
        setOpenBackdrop(true);
    };
    return (
        <Container className={classes.container}>
            <Backdrop className={classes.backdropRoutine} open={openBackdrop}>
                <Container className={classes.containerRoutine}>
                    <Paper className={classes.paperRoutine} elevation={3}>
                        <Button
                            variant="contained"
                            color={darkMode ? "secondary" : "primary"}
                            size="medium"
                            className={classes.buttonCloseRoutine}
                            onClick={handleCloseBackDrop}
                            startIcon={<CancelIcon />}
                        >Cancel</Button>
                    </Paper>
                </Container>
            </Backdrop>
            <Box className={classes.boxButton}>
                <Button
                    variant="contained"
                    color={darkMode ? "secondary" : "primary"}
                    size="large"
                    className={classes.button}
                    onClick={handleOpenBackDrop}
                    startIcon={<PlayCircleOutlineIcon />}
                >
                    Start Routine
                </Button>
            </Box>
        </Container>);
}

export default TodayPage;
