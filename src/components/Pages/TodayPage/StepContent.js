import React from 'react'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    headerStepper: {

    },
    typoStepper: {
        marginTop: 24,
        marginBottom: 24,
        fontSize: 20,
    },
    boxStepperContent: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    boxGiphy: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    buttonShuffleGiphy: {
        marginBottom: 28,
    },
    boxGiphyImage: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        width: '60vw',
        maxWidth: 900,
    },
    giphy: {
        height: '90%',
        width: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    },
    boxRecapDay: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '90%',
    },
    textFieldRecapDay: {
        height: '100%',
    },
    innerTextField: {
        '& label.Mui-focused': {
            color: 'green',
        },
    },
}));

const routineSteps = [
    {
        label: 'Eliminate negativity',
        description: ["The best way to get rid of bad thoughts and eliminiate negativity is to take some minutes to watch something funny and entertaining.", "Shuffle through some cat giphy's and move on to the next step if you feel comfortable: "],
    },
    {
        label: 'Empty your brain & close your day',
        description: ['"At the end of each day, you should play back the tapes of your performance. The results should either applaud you or prod you". [Jim Rohn] ', 'Remember what you did today and notice everything you\'ve accomplished, learned and anything worth remembering:'],
    },
    {
        label: 'Review your progress',
        description: ["After you have emptied your brain and you have written down what you have achieved today, review your progress and see whether you're doing all the things that you should be doing to fulfill your goals. ", "Review and edit your goals if needed:"],
    },
    {
        label: 'Get ready for tomorrow today',
        description: ['This is one of the most important things you can do before tomorrow morning. ', 'Write down the 3 most important tasks for tomorrow and give them a specific timeframe:'],
    },
    {
        label: 'Allow a moment of reflection & prayer',
        description: ['To close your day and your thoughts, write down what you have learned today and what was satisfying. '],
    },
];



const StepContent = (props) => {
    const classes = useStyles();
    const { activeStep, randomGiphyURL, shuffleGiphy, darkMode } = props;
    return (
        <>
            <Paper square elevation={0} className={classes.headerStepper}>
                <Typography variant="h4">{routineSteps[activeStep].label}</Typography>
            </Paper>
            {
                routineSteps[activeStep].description
                    .map((part, index) =>
                        <Typography key={index} className={classes.typoStepper}>{part}</Typography>
                    )
            }
            <Box className={classes.boxStepperContent}>
                {
                    activeStep === 0 &&
                    <>
                        <Box className={classes.boxGiphy}>
                            <Box className={classes.boxGiphyImage}>
                                <div style={{ backgroundImage: 'url(' + randomGiphyURL + ')' }} className={classes.giphy} />
                                {/*<img alt="Giphy" className={classes.giphy} src={randomGiphyURL} />*/}
                            </Box>
                            <Button
                                variant="contained"
                                color={darkMode ? "secondary" : "primary"}
                                size="small"
                                className={classes.buttonShuffleGiphy}
                                onClick={() => shuffleGiphy('cat')}
                            ><ShuffleIcon /></Button>
                        </Box>

                    </>
                }{
                    activeStep === 1 &&
                    <>
                        <Box className={classes.boxRecapDay}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Notes of today"
                                multiline
                                className={classes.textFieldRecapDay}
                                defaultValue="Write your notes of today here."
                                variant="outlined"
                                fullWidth="true"
                            />
                        </Box>
                    </>
                }{
                    activeStep === 2 &&
                    <>
                    </>
                }{
                    activeStep === 3 &&
                    <>
                    </>
                }
            </Box>
        </>
    );
}

export default StepContent;
