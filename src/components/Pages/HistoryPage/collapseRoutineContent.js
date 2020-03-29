import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';


const useStyles = makeStyles(theme => ({

}));

const CollapseRoutineContent = () => {
    const classes = useStyles();
    return (
        <List component="div" disablePadding>
            <ListItem className={classes.nested}>
                RecapText
            </ListItem>
            <ListItem className={classes.nested}>
                Tasks
            </ListItem>
            <ListItem className={classes.nested}>
                Goals
            </ListItem>
        </List>
    )
}

export default CollapseRoutineContent;
