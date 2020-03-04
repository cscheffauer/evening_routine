import React, { Component, } from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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
        paddingTop: 50,
        paddingBottom: 24,
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'space-between'
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

const tutorialSteps = [
    {
        label: 'Eliminate negativity',
        description: 'The best way to eliminiate negativity is to watch funny cat videos',
    },
    {
        label: 'Do a thing you love',
        description: 'Before going to sleep do something you really love, like reading a book. Have you done that already? If not, try it out tomorrow!',
    },
    {
        label: 'Plan out the next day',
        description: 'Write down the 3 most important tasks for tomorrow and give them a specific timeframe.',
    },
    {
        label: 'Review goals',
        description: 'Have a look at your goals and edit them if needed',
    },
    {
        label: 'Allow a moment of reflection & prayer',
        description: 'To close your day and your thoughts, write down what you have learned today and what was satisfying. ',
    },
];



class TodayPage extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            openBackdrop: false,

        }
    }
    render() {
        const { goals, classes, theme, darkMode } = this.props;
        const maxSteps = tutorialSteps.length;

        const handleCloseBackDrop = () => {
            this.setState({ openBackdrop: false });
        };
        const handleOpenBackDrop = () => {
            this.setState({ activeStep: 0, openBackdrop: true });
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
                                <Paper square elevation={0} className={classes.headerStepper}>
                                    <Typography>{tutorialSteps[this.state.activeStep].label}</Typography>
                                </Paper>
                                <Typography className={classes.typoStepper}>{tutorialSteps[this.state.activeStep].description}</Typography>
                                <MobileStepper
                                    steps={maxSteps}
                                    position="static"
                                    variant="progress"
                                    activeStep={this.state.activeStep}
                                    className={classes.stepper}
                                    nextButton={
                                        <Button size="small" onClick={handleNext} disabled={this.state.activeStep === maxSteps - 1}>
                                            Next
                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={handleBack} disabled={this.state.activeStep === 0}>
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
