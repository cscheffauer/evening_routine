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
        this.fetchRandomGiphy('cat');
        this.fetchRandomGiphy('sleep');
        this.state = {
            activeStep: 0,
            openBackdrop: false,
            randomGiphyCatURL: '',
            randomGiphySleepURL: '',
            tasksToBeSaved: [],
        }
    }


    fetchRandomGiphy = (tag) => {
        fetch('https://api.giphy.com/v1/gifs/random?api_key=mcJc4PG0eNZeswDk8cJEpWbDY3e8FBOI&tag=' + tag + '&rating=PG')
            .then(response => response.json())
            .then(response => {
                tag === 'cat' && this.setState({ randomGiphyCatURL: response.data.image_original_url })
                tag === 'sleep' && this.setState({ randomGiphySleepURL: response.data.image_original_url })
            }
            );
    }

    render() {
        const { goals, classes, theme, darkMode } = this.props;
        const maxSteps = 5;

        const onChangeTask = (changedTasks) => {
            console.log(changedTasks);
            this.setState({ tasksToBeSaved: changedTasks });
        }

        const handleOpenBackDrop = () => {
            this.setState({ activeStep: 0, openBackdrop: true });
        };

        const handleCloseBackDrop = () => {
            this.setState({ openBackdrop: false });
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

        const openUnsavedChangesWarning = () => {
            alert("attention - you might lose data");
            //Pop up should open here with a warning about losing data
            handleBack();
        }

        const disableNext = () => {
            return (this.state.activeStep === maxSteps - 1)
                || (this.state.activeStep === 2 && goals.length === 0)
                || (this.state.activeStep === 3 && this.state.tasksToBeSaved.length < 3)
        }

        const showUnsavedChangesWarning = () => {
            console.log(this.state.activeStep);
            console.log(this.state.tasksToBeSaved.length);
            return (this.state.activeStep === 3 && this.state.tasksToBeSaved.length > 0)
        }

        return (
            <Container className={classes.container}>
                <Backdrop className={classes.backdropRoutine} open={this.state.openBackdrop}>
                    <Container className={classes.containerRoutine}>
                        <Paper className={classes.paperRoutine} elevation={3}>
                            <Container className={classes.containerStepper}>
                                <StepContent activeStep={this.state.activeStep} onChangeTask={onChangeTask} randomGiphyCatURL={this.state.randomGiphyCatURL} randomGiphySleepURL={this.state.randomGiphySleepURL} shuffleGiphy={this.fetchRandomGiphy}></StepContent>
                                <MobileStepper
                                    steps={maxSteps}
                                    position="static"
                                    variant="progress"
                                    activeStep={this.state.activeStep}
                                    classes={{ progress: classes.progress }}    //to get the inner "progress" class of the MobileStepper 
                                    nextButton={
                                        <Button style={{ fontSize: '1rem' }} size="large" onClick={handleNext} disabled={disableNext()} >
                                            Next
                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                        </Button>
                                    }
                                    backButton={
                                        <Button style={{ fontSize: '1rem' }} size="large" onClick={showUnsavedChangesWarning() ? openUnsavedChangesWarning : handleBack} disabled={this.state.activeStep === 0}>
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
