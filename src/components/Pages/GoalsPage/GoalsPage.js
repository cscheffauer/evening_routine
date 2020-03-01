import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './GoalsPage.css';
import GoalCard from '../../GoalCard';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    boxGoals: {
        marginTop: 40,
    }
}));

const SettingsPage = (props) => {
    const { } = props;
    const classes = useStyles();

    const goals = [{
        title: 'Programming more',
        description: 'I would like to program more, spend my time on coding and create projects.',
        category: 'Personal Development'
    }, {
        title: 'Get my dream job as a coder',
        description: 'I would like to get that job at Google.',
        category: 'Career'
    }, {
        title: 'More active',
        description: 'I would like to be more active, do more sports.',
        category: 'Physical & Health'
    }, {
        title: 'Get more money',
        description: 'I would like to get more money.',
        category: 'Financial'
    }, {
        title: 'More resistant to stress & anxiety',
        description: 'I would like to get more resistant to stress & anxiety',
        category: 'Psychological'
    }];
    return (
        <Container>
            <Box>
                <Typography variant="h4">
                    Your goals
                </Typography>
            </Box>
            <Box className={classes.boxGoals} >
                <Grid className={classes.root} item xs={12}>
                    <Grid container justify="center" spacing={3}>
                        {goals.map((goal, index) => (
                            <Grid key={index} item>
                                <GoalCard goal={goal} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Container>);
}

export default SettingsPage;
