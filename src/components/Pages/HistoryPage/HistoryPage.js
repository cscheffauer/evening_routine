import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CollapseRoutineContent from './collapseRoutineContent';

const mapStateToProps = state => {
    return {
        darkMode: state.changeDarkMode.darkMode,
        routines: state.changeRoutines.routines,                    // -''-
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
    }
}));

const HistoryPage = (props) => {
    const { darkMode, routines } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState({ anyOpen: false, id: undefined });

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
                        <Collapse in={open.anyOpen && (open.id === routine.id)} timeout="auto" unmountOnExit>
                            <CollapseRoutineContent routine={routine} />
                        </Collapse>
                    </Box>
                )}
            </List>

        </Container >);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
