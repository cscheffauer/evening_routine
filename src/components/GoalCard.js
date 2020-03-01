import React from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';

import { GOAL_CATEGORIES } from '../constants';

const getGoalCategoryImage = (category) => {
    switch (category) {
        case GOAL_CATEGORIES.GOAL_CAT_CAREER:
            return "/images/goals/categories/career.png"
        case GOAL_CATEGORIES.GOAL_CAT_EDUCATIONAL:
            return "/images/goals/categories/educational.png"
        case GOAL_CATEGORIES.GOAL_CAT_EXTERNAL:
            return "/images/goals/categories/external.png"
        case GOAL_CATEGORIES.GOAL_CAT_EXPERIMENTAL:
            return "/images/goals/categories/experimental.png"
        case GOAL_CATEGORIES.GOAL_CAT_FINANCIAL:
            return "/images/goals/categories/financial.png"
        case GOAL_CATEGORIES.GOAL_CAT_HEALTH:
            return "/images/goals/categories/health.png"
        case GOAL_CATEGORIES.GOAL_CAT_PERSONAL:
            return "/images/goals/categories/personal.png"
        case GOAL_CATEGORIES.GOAL_CAT_PSYCHOLOGICAL:
            return "/images/goals/categories/psychological.png"
        case GOAL_CATEGORIES.GOAL_CAT_RELATIONSHIP:
            return "/images/goals/categories/relationship.png"
        case GOAL_CATEGORIES.GOAL_CAT_SPIRITUAL:
            return "/images/goals/categories/spiritual.png"
        default:
            break;
    }
}


const useStyles = (darkMode) => makeStyles(theme => ({
    root: {
        height: '100%',
        width: 250,
        [theme.breakpoints.down('sm')]: {
            width: 250,
        },
        [theme.breakpoints.up('sm')]: {
            width: 350,
        },
    },
    media: {
        height: 200,
        backgroundColor: darkMode ? theme.palette.secondary.main : theme.palette.primary.main,
        marginTop: 40,
    },
    cardActionArea: {
        height: '100%'
    },
    boxDeleteButton: {
        height: 40,
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    deleteButton: {
        float: 'right',
        padding: '8px 5px',
        minWidth: 45,
    },
    cardContent: {
        height: 'inherit'
    }

}));

const GoalCard = (props) => {
    const { goal, darkMode } = props;
    const classes = useStyles(darkMode)();
    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.cardActionArea}>

                <CardMedia
                    className={classes.media}
                    image={getGoalCategoryImage(goal.category)}
                    title={goal.category}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {goal.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {goal.description}
                    </Typography>
                </CardContent>
                <Box className={classes.boxDeleteButton}>
                    <Button className={classes.deleteButton} size="small" color={darkMode ? "secondary" : "primary"}>
                        <HighlightOffIcon />
                    </Button>
                </Box>
            </CardActionArea>

        </Card>
    );
}

export default GoalCard;