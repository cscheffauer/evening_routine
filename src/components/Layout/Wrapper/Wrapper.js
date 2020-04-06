import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
/*
Wrapper is a component to wrap the content inside of the drawer and toolbar
*/

const useStyles = makeStyles(theme => ({
    content: {

        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
            marginLeft: 200,
        },
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            paddingLeft: 5,
            paddingRight: 5,
            marginTop: 56,
        },
    },
}));

const Wrapper = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            {props.children}
        </div>
    );
};

export default Wrapper;