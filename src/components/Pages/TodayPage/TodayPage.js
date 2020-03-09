import React, { Component, } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import StepContent from './StepContent';


const styles = (theme => ({
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
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },

    boxButton: {
        display: 'flex',
        justifyContent: 'center'
    },
    backdropRoutine: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    containerRoutine: {
        maxWidth: 1200,
    },
    paperRoutine: {
        height: '90vh',
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'space-between'
    },
    containerStepper: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 24,
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'space-between'
    },
    progress: {
        height: 10,
        borderRadius: 20,
    },
    buttonSaveCloseRoutine: {
        float: 'right',
        marginLeft: 20
    },
    boxButtonSaveClose: {
        paddingBottom: 24,
        [theme.breakpoints.down('sm')]: {
            paddingRight: 16,
        },
        [theme.breakpoints.up('sm')]: {
            paddingRight: 24,
        },
    }
}));


class TodayPage extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            openBackdrop: false,
            randomGiphyURL: ''
        }
    }

    render() {
        const { goals, classes, theme, darkMode } = this.props;
        const maxSteps = 5;

        const handleCloseBackDrop = () => {
            this.setState({ openBackdrop: false });
        };

        const fetchRandomGiphy = (tag) => {
            fetch('https://api.giphy.com/v1/gifs/random?api_key=mcJc4PG0eNZeswDk8cJEpWbDY3e8FBOI&tag=' + tag + '&rating=PG')
                .then(response => response.json())
                .then(response => this.setState({ randomGiphyURL: response.data.image_original_url }));
        }

        const handleOpenBackDrop = () => {
            this.setState({ activeStep: 0, openBackdrop: true });
            fetchRandomGiphy('cat');
        };

        const handleNext = () => {
            this.setState((prevState) => ({
                activeStep: prevState.activeStep + 1
            }));
        };

        const handleBack = () => {
            this.setState((prevState) => ({
                activeStep: prevState.activeStep - 1
            }));
        };
        return (
            <Container className={classes.container}>
                <Backdrop className={classes.backdropRoutine} open={this.state.openBackdrop}>
                    <Container className={classes.containerRoutine}>
                        <Paper className={classes.paperRoutine} elevation={3}>
                            <Container className={classes.containerStepper}>
                                <StepContent activeStep={this.state.activeStep} randomGiphyURL={this.state.randomGiphyURL} shuffleGiphy={fetchRandomGiphy}></StepContent>
                                <MobileStepper
                                    steps={maxSteps}
                                    position="static"
                                    variant="progress"
                                    activeStep={this.state.activeStep}
                                    classes={{ progress: classes.progress }}    //to get the inner "progress" class of the MobileStepper 
                                    nextButton={
                                        <Button style={{ fontSize: '1rem' }} size="large" onClick={handleNext} disabled={(this.state.activeStep === maxSteps - 1) || (this.state.activeStep === 2 && goals.length === 0)} >
                                            Next
                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                        </Button>
                                    }
                                    backButton={
                                        <Button style={{ fontSize: '1rem' }} size="large" onClick={handleBack} disabled={this.state.activeStep === 0}>
                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                            Back
                                    </Button>
                                    }
                                />
                            </Container>
                            <Box className={classes.boxButtonSaveClose}>
                                <Button
                                    variant="outlined"
                                    color={darkMode ? "secondary" : "primary"}
                                    size="large"
                                    className={classes.buttonSaveCloseRoutine}
                                    onClick={handleCloseBackDrop}
                                    disabled={!(this.state.activeStep === maxSteps - 1)}
                                >Save</Button>
                                <Button
                                    variant="outlined"
                                    color={darkMode ? "secondary" : "primary"}
                                    size="large"
                                    className={classes.buttonSaveCloseRoutine}
                                    onClick={handleCloseBackDrop}
                                >Cancel</Button>
                            </Box>

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
    };
}
export default withTheme(withStyles(styles)(TodayPage));
