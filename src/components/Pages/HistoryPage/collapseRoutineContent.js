import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';

const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3]):[0-5]\d|24:00)(:[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?$/;


const useStyles = makeStyles(theme => ({

    listTasks: {
        width: '100%',
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
}));

const CollapseRoutineContent = (props) => {
    const { routine, darkMode } = props;
    const classes = useStyles();
    const compareTasks = (a, b) => {
        return (a.done === b.done) ? Date.parse(a.plannedtime) - Date.parse(b.plannedtime)
            : (a.done && !b.done) ? 1
                : (!a.done && b.done) && -1
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

    return (
        <List component="div" disablePadding>
            <ListItem>
                {
                    routine.tasks ?
                        <List
                            className={classes.listTasks}
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Tasks
                                </ListSubheader>
                            }>
                            {routine.tasks.sort((a, b) => compareTasks(a, b)).map(task =>
                                <ListItem key={task.tableData.id}>

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
                                            disabled
                                            edge="start"
                                            checked={task.done}
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
                            No important tasks scheduled for today.
                        </Typography>
                }
            </ListItem>
            <ListItem className={classes.nested}>
                Recap
            </ListItem>
            <ListItem className={classes.nested}>
                Goals
            </ListItem>
        </List>
    )
}

export default CollapseRoutineContent;
