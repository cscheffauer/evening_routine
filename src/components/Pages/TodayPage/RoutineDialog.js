import React, { Component } from 'react'
import { connect } from 'react-redux';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles, withTheme } from '@material-ui/core/styles';

import StepContent from './StepContent';

import { saveRoutine } from '../../../actions/actions'

const mapStateToProps = state => {
    return {
        darkMode: state.changeDarkMode.darkMode,
        goals: state.changeGoals.goals                    // -''-
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveRoutine: (routine) => dispatch(saveRoutine(routine)),
    }
}

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

const INITIAL_RECAP_TEXT = 'Write your notes of today here.';

class RoutineDialog extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            randomGiphyCatURL: '',
            randomGiphySleepURL: '',
            recapText: INITIAL_RECAP_TEXT,
            tasksToBeSaved: [],
        }
    }

    render() {

        const { openBackdrop, handleCloseBackDrop, randomGiphyCatURL, randomGiphySleepURL, fetchRandomGiphy, showRoutineSavedMsg, goals, onSaveRoutine, classes, theme, darkMode, } = this.props;

        const maxSteps = 5;

        const onChangeTask = (changedTasks) => {
            this.setState({ tasksToBeSaved: changedTasks });
        }
        const onChangeRecapText = (recapText) => {
            this.setState({ recapText: recapText });
        }


        const handleNext = () => {
            this.setState((prevState) => ({
                activeStep: prevState.activeStep + 1
            }));
        };
        const disableNext = () => {
            return (this.state.activeStep === maxSteps - 1)
                || (this.state.activeStep === 2 && goals.length === 0)
                || (this.state.activeStep === 3 && this.state.tasksToBeSaved.length < 3)
        }
        const handleBack = () => {
            this.setState((prevState) => ({
                activeStep: prevState.activeStep - 1
            }));
        };

        const handleClose = () => {
            //show unsavedmessage before closing
            handleCloseBackDrop();
            const timer = setTimeout(() => {
                this.setState({ activeStep: 0, tasksToBeSaved: [], recapText: INITIAL_RECAP_TEXT });
                clearTimeout(timer);
            }, 500);
        };


        const handleSaveRoutine = () => {
            onSaveRoutine({
                recap: this.state.recapText,
                tasks: this.state.tasksToBeSaved,
                goals: goals,
                createdAt: new Date().toLocaleString()
            });
            handleCloseBackDrop();

            const timer = setTimeout(() => {
                showRoutineSavedMsg();
                clearTimeout(timer);
            }, 1000);
        };

        return (
            <Backdrop className={classes.backdropRoutine} open={openBackdrop}>
                <Container className={classes.containerRoutine}>
                    <Paper className={classes.paperRoutine} elevation={3}>
                        <Container className={classes.containerStepper}>
                            <StepContent activeStep={this.state.activeStep} recapText={this.state.recapText} onChangeRecapText={onChangeRecapText} tasks={this.state.tasksToBeSaved} onChangeTask={onChangeTask} randomGiphyCatURL={randomGiphyCatURL} randomGiphySleepURL={randomGiphySleepURL} shuffleGiphy={fetchRandomGiphy}></StepContent>
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
                                onClick={handleSaveRoutine}
                                disabled={!(this.state.activeStep === maxSteps - 1)}
                            >Save</Button>
                            <Button
                                variant="outlined"
                                color={darkMode ? "secondary" : "primary"}
                                size="large"
                                className={classes.buttonSaveCloseRoutine}
                                onClick={handleClose}
                            >Cancel</Button>
                        </Box>

                    </Paper>
                </Container>
            </Backdrop>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withStyles(styles)(RoutineDialog)));
