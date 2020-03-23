import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles, withTheme } from '@material-ui/core/styles';
import RoutineDialog from './RoutineDialog';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = state => {
    return {
        darkMode: state.changeDarkMode.darkMode,
        goals: state.changeGoals.goals                    // -''-
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
        const { classes, darkMode } = this.props;


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
