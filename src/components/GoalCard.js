import React from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';

import { GOAL_CATEGORIES } from '../constants';

const getGoalCategoryImage = (category) => {
    switch (category) {
        case GOAL_CATEGORIES.GOAL_CAT_CAREER:
            return "/images/goals/categories/career.png"

        default:
            break;
    }
}


const useStyles = makeStyles(theme => ({
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
        backgroundColor: theme.palette.secondary.main,
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
        padding: '8px 5px'
    },
    cardContent: {
        height: 'inherit'
    }

}));

const GoalCard = (props) => {
    const classes = useStyles();
    const { goal } = props;
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
                    <Button className={classes.deleteButton} size="small" color="primary">
                        <DeleteIcon />
                    </Button>
                </Box>
            </CardActionArea>

        </Card>
    );
}

export default GoalCard;