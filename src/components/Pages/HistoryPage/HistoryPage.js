import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CollapseRoutineContent from './collapseRoutineContent';

import { setPageVisited } from '../../../actions/actions'
import { HISTORY_ROUTE } from '../../../constants';

const mapStateToProps = state => {
    return {
        darkMode: state.changeDarkMode.darkMode,
        routines: state.changeRoutines.routines,
        pagesVisited: state.changePageVisited.pagesVisited                    // -''-
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangePageVisited: (ROUTE, visited) => dispatch(setPageVisited(ROUTE, visited)),
    }
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            height: '80vh',
        },
        [theme.breakpoints.up('md')]: {
            height: 'calc(100vh - (112px))',
        }
    },
    listRoutine: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.paper,
    },
    typoRoutineFrontPrim: {
        margin: 'auto 30px auto 0px',
        paddingRight: 20,
        borderRight: '3px #496AEA solid',
        textAlign: 'left',
        minWidth: 200,
    },
    typoRoutineFrontSec: {
        margin: 'auto 30px auto 0px',
        paddingRight: 20,
        borderRight: '3px #FBA435 solid',
        textAlign: 'left',
        minWidth: 200,
    },
    typoRoutineWeekDay: {
        fontSize: '1.5rem',
    },
    typoRoutineDate: {
        fontSize: '1rem',
    },
    collapseInnerContent: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '5vw'
        },

    }
}));

const HistoryPage = (props) => {
    const { darkMode, routines, pagesVisited, onChangePageVisited } = props;
    const historyPageVisited = pagesVisited.filter(page => page.route === HISTORY_ROUTE)[0].visited;

    const classes = useStyles();
    const [open, setOpen] = React.useState({ anyOpen: false, id: undefined });
    const [historySnackBarOpen, setHistorySnackBarOpen] = React.useState(false);

    const handleExpandRoutine = (routineId) => {
        (open.id === routineId) ?
            setOpen({ anyOpen: false, id: undefined })
            :
            setOpen({ anyOpen: true, id: routineId });
    };

    const compareRoutines = (a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    }
    const getWeekDayRenderValue = (createdAt) => {
        var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekDays.find(weekDay => weekDay.startsWith(createdAt.split(' ')[0]));
    }

    const getDaySuffix = (day) => {
        switch (day) {
            case "1":
                return "st";
            case "2":
                return "nd";
            case "3":
                return "rd";
            case "21":
                return "st";
            case "22":
                return "nd";
            case "23":
                return "rd";
            case "31":
                return "st";
            default:
                return "th";
        }
    }

    const getDateRenderValue = (createdAt) => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthString = months.find(month => month.startsWith(createdAt.split(' ')[1]));
        const day = createdAt.split(' ')[2];
        const dayString = day + getDaySuffix(day);
        const yearString = createdAt.split(' ')[3];
        const dateString = dayString + " " + monthString + ", " + yearString;
        return dateString;
    }

    useEffect(() => {
        if (!historyPageVisited) {
            const timer = setTimeout(() => {
                setHistorySnackBarOpen(true);
                onChangePageVisited(HISTORY_ROUTE, true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [historyPageVisited])

    return (
        <Container>
            <List>
                {routines.sort((a, b) => compareRoutines(a, b)).map(routine =>
                    <Box key={routine.id} >
                        <ListItem className={classes.listRoutine} button onClick={(e) => handleExpandRoutine(routine.id)} >
                            <ListItemAvatar className={darkMode ? classes.typoRoutineFrontSec : classes.typoRoutineFrontPrim}>
                                <>
                                    <Typography className={classes.typoRoutineWeekDay}>
                                        {getWeekDayRenderValue(routine.createdAt)}
                                    </Typography>
                                    <Typography className={classes.typoRoutineDate}>
                                        {getDateRenderValue(routine.createdAt)}
                                    </Typography>
                                </>
                            </ListItemAvatar>
                            <ListItemText
                                primary={routine.tasks.filter(task => (task.done === true)).length + " of " + routine.tasks.length + " tasks completed"}
                            />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse className={classes.collapseInnerContent} in={open.anyOpen && (open.id === routine.id)} timeout="auto" unmountOnExit>
                            <CollapseRoutineContent routine={routine} darkMode={darkMode} />
                        </Collapse>
                    </Box>
                )}
            </List>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                key={`right,bottom`}
                open={historySnackBarOpen}
                message={`Be aware that this is just dummy data. An option to sign up and save your evening routines will be implemented soon!`}
                autoHideDuration={12000}
                onClose={() => setHistorySnackBarOpen(false)}
            />

        </Container>);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
