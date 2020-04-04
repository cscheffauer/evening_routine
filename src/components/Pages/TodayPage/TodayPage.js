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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { setTaskDone } from '../../../actions/actions';

const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3]):[0-5]\d|24:00)(:[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?$/;

function isObjectEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

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
        onSetTaskDone: (routineIndex, taskIndex, done) => dispatch(setTaskDone(routineIndex, taskIndex, done)),
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
    checkBoxTask: {
        minWidth: 30,
    },
    typoTaskTimePrim: {
        margin: 'auto 20px auto 0px',
        paddingRight: 20,
        fontSize: '1.5rem',
        borderRight: '3px #496AEA solid',
    },
    typoTaskTimeSec: {
        margin: 'auto 20px auto 0px',
        paddingRight: 20,
        fontSize: '1.5rem',
        borderRight: '3px #FBA435 solid',
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
        const { routineToShow, onSetTaskDone, classes, darkMode } = this.props;

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
        const compareTasks = (a, b) => {
            return (a.done === b.done) ? Date.parse(a.plannedtime) - Date.parse(b.plannedtime)
                : (a.done && !b.done) ? 1
                    : (!a.done && b.done) && -1
        }

        const handleTaskDone = (event, taskId, taskDone) => {
            console.log(event.target.checked);
            onSetTaskDone(routineToShow.id, taskId, !taskDone)
        }

        const getPlannedTimeRenderValue = (plannedtime) => {
            if (plannedtime instanceof Date) {
                return plannedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else if (isoDateRegex.exec(plannedtime)) {
                return new Date(plannedtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                return plannedtime;
            }
        }

        const getYourTasksLabel = (LabelType) => {
            var midnight = new Date(new Date().toDateString());
            var tonight = new Date(new Date().toDateString());
            tonight.setDate(midnight.getDate() + 1);
            var returnValue = "today";
            returnValue =
                (LabelType === "Tasks") ? ((Date.parse(tonight) > Date.parse(routineToShow.createdAt)) ? "tomorrow" : "today") :
                    (LabelType === "Recap") ? ((Date.parse(tonight) > Date.parse(routineToShow.createdAt)) ? "today" : "yesterday") :
                        "today"
            return returnValue;
        }

        return (
            <Container className={classes.container} >
                <RoutineDialog openBackdrop={this.state.openBackdrop} handleCloseBackDrop={handleCloseBackDrop} randomGiphyCatURL={this.state.randomGiphyCatURL} randomGiphySleepURL={this.state.randomGiphySleepURL} fetchRandomGiphy={this.fetchRandomGiphy} showRoutineSavedMsg={showRoutineSavedMsg} />

                <Box className={classes.boxTasks} >
                    <Box>
                        <Typography className={classes.centerTypo} variant="h4">
                            {routineToShow.tasks ?
                                (
                                    "Your tasks for " + getYourTasksLabel("Tasks")
                                )
                                :
                                "Your tasks"
                            }

                        </Typography>
                    </Box>
                    {
                        routineToShow.tasks ?
                            <List>
                                {routineToShow.tasks.sort((a, b) => compareTasks(a, b)).map(task =>
                                    <ListItem key={task.tableData.id} disabled={task.done}>

                                        <ListItemAvatar>
                                            <Typography className={darkMode ? classes.typoTaskTimeSec : classes.typoTaskTimePrim} paragraph>
                                                {getPlannedTimeRenderValue(task.plannedtime)}
                                            </Typography>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={task.title}
                                            secondary={task.description}
                                        />
                                        <ListItemIcon className={classes.checkBoxTask}>
                                            <Checkbox
                                                edge="start"
                                                checked={task.done}
                                                onChange={e => handleTaskDone(e, task.tableData.id, task.done)}
                                                tabIndex={-1}
                                                disableRipple
                                                color={darkMode ? "secondary" : "primary"}
                                            />
                                        </ListItemIcon>
                                    </ListItem>

                                )}
                            </List>
                            :
                            <Typography className={classes.centerTypo} paragraph>
                                No important tasks scheduled.
                        </Typography>
                    }
                </Box>

                <Box className={classes.boxRecap} >
                    <Box>
                        <Typography className={classes.centerTypo} variant="h4">
                            {routineToShow.tasks ?
                                (
                                    "Your recap of " + getYourTasksLabel("Recap")
                                )
                                :
                                "Your recap"
                            }
                        </Typography>
                    </Box>
                    {
                        routineToShow.recap ?
                            <TextField
                                className={classes.recapTextField}
                                multiline
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
                        disabled={!isObjectEmpty(routineToShow)}
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
