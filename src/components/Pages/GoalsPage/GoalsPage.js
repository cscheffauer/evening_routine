import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GoalCard from './GoalCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import AddGoal from './AddGoal';
import EditGoal from './EditGoal';

import {
    GOAL_CATEGORIES
} from '../../../constants'       //get constants form constants file



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('md')]: {
            maxWidth: 1280,
            height: 'calc(100vh - (112px))',
        },
    },
    boxGoals: {
        height: '100%',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    boxNoGoals: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imgNoGoals: {
        width: '55vh',
        [theme.breakpoints.down('sm')]: {
            width: '35vh',
        },
        margin: '0 auto',
    },
    typoNoGoals: {
        textAlign: 'center',
        marginTop: 60,
        [theme.breakpoints.down('sm')]: {
            marginTop: 30,
        }
    },
    buttonAdd: {
        display: 'flex',
        margin: 'auto',
        marginTop: 30,
        marginBottom: 30,
        minHeight: 56,
    },
    centerTypo: {
        textAlign: 'center',
    }
}));


const GoalsPage = (props) => {
    const { goals, onAddGoal, onEditGoal, onRemoveGoal, options, darkMode } = props;
    const classes = useStyles();

    const initialNewGoal = {
        title: '',
        description: '',
        category: GOAL_CATEGORIES.GOAL_CAT_EDUCATIONAL,
    }

    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [newGoal, setNewGoal] = React.useState({});
    const [goalToBeEdited, setGoalToBeEdited] = React.useState({});
    const [indexOfGoal, setIndexOfGoal] = React.useState(0);

    const openAddGoalDialog = () => {
        setNewGoal(Object.assign({}, initialNewGoal));
        setOpenAdd(true);
    };

    const openEditGoalDialog = (goal, index) => {
        setGoalToBeEdited(Object.assign({}, goal));
        setIndexOfGoal(index);
        setOpenEdit(true);
    }

    const handleAdd = (event, goalToBeAdded) => {
        event.preventDefault();
        onAddGoal(Object.assign({}, goalToBeAdded));
        handleClose();
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
        setOpenAdd(false);
        setOpenEdit(false);
    };
    return (
        <Container className={!options.hideTitle ? classes.container : undefined}>
            {!options.hideTitle &&
                <Box>
                    <Typography className={classes.centerTypo} variant={isWidthUp('sm', props.width) ? "h4" : "h6"}>
                        Your personal goals
                        </Typography>
                </Box>
            }
            <Box className={classes.boxGoals} >
                {goals.length > 0 ?
                    <Grid className={classes.root} item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {goals.map((goal, index) => (
                                <Grid key={index} item>
                                    <GoalCard goal={goal} index={index} openEditGoalDialog={openEditGoalDialog} handleRemove={handleRemove} darkMode={darkMode} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    :
                    !options.hideTitle ?
                        <Box className={classes.boxNoGoals}>
                            <img alt="noGoalsImage" className={classes.imgNoGoals} src={`/images/goals/` + (darkMode ? `noGoals_dark` : `noGoals`) + `.png`} />
                            <Typography className={classes.typoNoGoals} paragraph>
                                {options.noGoalsMessage}
                            </Typography>
                        </Box>
                        :
                        <Typography className={classes.typoNoGoals} paragraph>
                            {options.noGoalsMessage}
                        </Typography>


                }
            </Box>
            <Fab className={classes.buttonAdd} onClick={openAddGoalDialog} color={darkMode ? "secondary" : "primary"} aria-label="add">
                <AddIcon />
            </Fab>
            <AddGoal initialGoal={newGoal} handleAdd={handleAdd} handleClose={handleClose} open={openAdd} darkMode={darkMode} />
            <EditGoal initialGoal={goalToBeEdited} index={indexOfGoal} handleEdit={handleEdit} handleClose={handleClose} open={openEdit} />
        </Container>
    );
};



export default withWidth()(GoalsPage);
