import React, { Fragment } from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

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
        maxWidth: 1600,
    },
    paperRoutine: {
        height: '90vh',
    },
    containerStepper: {
        paddingTop: 50
    },
    buttonCloseRoutine: {
        float: 'right',
        marginTop: 5,
        marginRight: 5,
    }
}));

function getSteps() {
    return ['Eliminate negativity', 'Do a thing you love', 'Plan out the next day', 'Review goals', 'Allow a moment of reflection & prayer'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Get rid of negative thoughts before going to bed to clear up your mind. A proper laugh can help to let go of your thoughts.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
        case 3:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 4:
            return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}



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

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
                        <Container className={classes.containerStepper}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            <Typography>{getStepContent(index)}</Typography>
                                            <div className={classes.actionsContainer}>
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}
                                                        className={classes.button}
                                                    >
                                                        Back
                                                </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleNext}
                                                        className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} className={classes.resetContainer}>
                                    <Typography>All steps completed - you&apos;re finished</Typography>
                                    <Button onClick={handleReset} className={classes.button}>
                                        Reset
                                </Button>
                                </Paper>
                            )}
                        </Container>
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
