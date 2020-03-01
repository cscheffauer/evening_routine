import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GoalCard from './GoalCard';

import AddGoal from './AddGoal';

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
    console.log(goals);
    const classes = useStyles();
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
                                    <GoalCard index={index} goal={goal} darkMode={darkMode} onRemoveGoal={onRemoveGoal} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    :
                    <Typography className={classes.centerTypo} paragraph>
                        No goals defined.
                    </Typography>
                }
            </Box>
            <AddGoal onAddGoal={onAddGoal} darkMode={darkMode} />
        </Container>

    );

}

export default GoalsPage;
