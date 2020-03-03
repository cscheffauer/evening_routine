import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GoalCard from './GoalCard';

import AddGoal from './AddGoal';
import EditGoal from './EditGoal';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    boxGoals: {
        marginTop: 40,
    },
    buttonAdd: {
        display: 'flex',
        margin: 'auto',
        marginTop: 30,
        marginBottom: 30
    },
    centerTypo: {
        textAlign: 'center',
    }
}));


const GoalsPage = (props) => {
    const { darkMode, goals, onAddGoal, onEditGoal, onRemoveGoal } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [goalToBeEdited, setGoalToBeEdited] = React.useState({});
    const [indexOfGoal, setIndexOfGoal] = React.useState(0);

    const openEditGoalDialog = (goal, index) => {
        setGoalToBeEdited(Object.assign({}, goal));
        setIndexOfGoal(index);
        console.log(goal);
        !(Object.entries(goal).length === 0 && goal.constructor === Object) && setOpen(true);
    }

    const handleEdit = (event, goalToBeEdited, index) => {
        event.preventDefault();
        onEditGoal(Object.assign({}, goalToBeEdited), index);
        handleClose();
    };

    const handleRemove = (index) => {
        onRemoveGoal(index);
    }

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container>
            <Box>
                <Typography className={classes.centerTypo} variant="h4">
                    Your goals
                        </Typography>
            </Box>
            <Box className={classes.boxGoals} >
                {goals.length > 0 ?
                    <Grid className={classes.root} item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {goals.map((goal, index) => (
                                <Grid key={index} item>
                                    <GoalCard index={index} goal={goal} darkMode={darkMode} handleRemove={handleRemove} openEditGoalDialog={openEditGoalDialog} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    :
                    <Typography className={classes.centerTypo} paragraph>
                        No goals defined. Define at least one goal to start your evening routine.
                        </Typography>
                }
            </Box>
            <AddGoal onAddGoal={onAddGoal} darkMode={darkMode} />
            <EditGoal handleEdit={handleEdit} handleClose={handleClose} initialGoal={goalToBeEdited} index={indexOfGoal} open={open} />
        </Container>
    );
};



export default GoalsPage;
