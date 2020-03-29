import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles, withTheme } from '@material-ui/core/styles';
import RoutineDialog from './RoutineDialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = state => {
    return {
        darkMode: state.changeDarkMode.darkMode,
        goals: state.changeGoals.goals,
        routineToShow: state.changeRoutines.routineToShow,                    // -''-
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const styles = (theme => ({
    //toolbar: theme.mixins.toolbar,
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            height: '80vh',
        },
        [theme.breakpoints.up('md')]: {
            height: 'calc(100vh - (112px))',
        }
    },
    button: {
    },

    boxButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    centerTypo: {
        textAlign: 'center',
    },
    boxTasks: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    boxRecap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    recapTextField: {
        marginTop: 20,
    }

}));


class TodayPage extends Component {
    constructor() {
        super();
        this.fetchRandomGiphy('cat');
        this.fetchRandomGiphy('sleep');
        this.state = {
            openBackdrop: false,
            routineSavedMsgOpen: false,
            randomGiphyCatURL: '',
            randomGiphySleepURL: '',
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
        const { routineToShow, classes, darkMode } = this.props;

        const handleOpenBackDrop = () => {
            this.setState({ openBackdrop: true });
        };
        const handleCloseBackDrop = () => {
            this.setState({ openBackdrop: false });
        };

        const showRoutineSavedMsg = () => {
            this.setState({ routineSavedMsgOpen: true });
        }
        const closeRoutineSavedMsg = () => {
            this.setState({ routineSavedMsgOpen: false });
        }

        return (
            <Container className={classes.container}>
                <RoutineDialog openBackdrop={this.state.openBackdrop} handleCloseBackDrop={handleCloseBackDrop} randomGiphyCatURL={this.state.randomGiphyCatURL} randomGiphySleepURL={this.state.randomGiphySleepURL} fetchRandomGiphy={this.fetchRandomGiphy} showRoutineSavedMsg={showRoutineSavedMsg} />

                <Box className={classes.boxTasks} >
                    <Box>
                        <Typography className={classes.centerTypo} variant="h4">
                            Your tasks for today
                        </Typography>
                    </Box>
                    {
                        /*<Grid className={classes.root} item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {goals.map((goal, index) => (
                                <Grid key={index} item>
                                    <GoalCard goal={goal} index={index} openEditGoalDialog={openEditGoalDialog} handleRemove={handleRemove} darkMode={darkMode} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                        :*/
                        <Typography className={classes.centerTypo} paragraph>
                            No important tasks scheduled for today.
                        </Typography>
                    }
                </Box>

                <Box className={classes.boxRecap} >
                    <Box>
                        <Typography className={classes.centerTypo} variant="h4">
                            Your recap of yesterday
                        </Typography>
                    </Box>
                    {
                        routineToShow.recap ?
                            <TextField
                                className={classes.recapTextField}
                                multiline
                                defaultValue="No recap done - try to write some sentences and notes on your daily recap to ensure you are letting go of your day."
                                value={routineToShow.recap}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                            :
                            <Typography className={classes.centerTypo} paragraph>
                                No recap found.
                            </Typography>
                    }
                </Box>

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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    autoHideDuration={6000}
                    open={this.state.routineSavedMsgOpen}
                    onClose={closeRoutineSavedMsg}
                >
                    <Alert severity="success">
                        Evening routine has been saved!
                    </Alert>
                </Snackbar>
            </Container>);
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withStyles(styles)(TodayPage)));
