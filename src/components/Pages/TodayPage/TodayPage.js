import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles, withTheme } from '@material-ui/core/styles';
import RoutineDialog from './RoutineDialog';
import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = state => {
    return {
        darkMode: state.changeDarkMode.darkMode,
        goals: state.changeGoals.goals,
        routines: state.changeRoutines.routines,                    // -''-
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

    boxButton: {
        display: 'flex',
        justifyContent: 'center'
    },
    centerTypo: {
        textAlign: 'center',
    },

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
            routineToShow: {},
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
        const { routines, classes, darkMode } = this.props;

        const calculateRoutineToShow = () => {
            var now = new Date();

            var midnight = new Date(new Date().toDateString());
            /*
                        var six = new Date(new Date().toDateString());;
                        six.setHours(midnight.getHours() + 6);
            
                        var eightteen = new Date(new Date().toDateString());
                        eightteen.setHours(midnight.getHours() + 18);
            
                        var endofday = new Date(new Date().toDateString());
                        endofday.setDate(midnight.getDate() + 1);
                        endofday.setMilliseconds(endofday.getMilliseconds() - 1);
            
                        var yesterday = new Date(new Date().toDateString());
                        yesterday.setDate(midnight.getDate() - 1);
            */
            var yesterdaySix = new Date(new Date().toDateString());
            yesterdaySix.setDate(midnight.getDate() - 1);
            yesterdaySix.setHours(yesterdaySix.getHours() + 6);

            routines.sort((a, b) => {
                return Date.parse(b.createdAt) - Date.parse(a.createdAt);
            });

            this.setState({
                routineToShow: routines.find(routine => (Date.parse(yesterdaySix) < Date.parse(routine.createdAt)) && (Date.parse(routine.createdAt) < Date.parse(now)))
            });
        }

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
                <Box>
                    <Typography className={classes.centerTypo} variant="h4">
                        Your tasks for today
                        </Typography>
                </Box>
                <Box className={classes.boxTasks} >

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
                        <Typography onClick={calculateRoutineToShow} className={classes.centerTypo} paragraph>
                            No important tasks scheduled for today.
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
