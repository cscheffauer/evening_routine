import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './InitialPage.css';
import { GOALS_ROUTE } from '../../../constants';

const useStyles = makeStyles(theme => ({
    //toolbar: theme.mixins.toolbar,
    boxHeading: {
        marginTop: '10vh'
    },
    boxSubline: {
        marginTop: '5vh'
    },
    link: {
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none',
        }
    }
}));


const InitialPage = (props) => {
    const classes = useStyles();
    const { darkMode, onRouteChange } = props;

    const [open, setOpen] = React.useState(false);
    const [firstTimeVisited, setFirstTimeVisited] = React.useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleCloseAndGoals = () => {
        setFirstTimeVisited(false);
        setOpen(false);
        onRouteChange(GOALS_ROUTE);
    }

    useEffect(() => {
        if (firstTimeVisited) {
            const timer = setTimeout(() => {
                handleClick();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [open])



    return (
        <Container>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                key={`center,bottom`}
                open={open}
                message="To start your evening routine, please fulfill your goals first."
                action={
                    <>
                        <Button variant="contained" color={darkMode ? "secondary" : "primary"} size="small" onClick={handleCloseAndGoals}>
                            GO FOR IT!
                            </Button>
                    </>
                }
            />
        </Container>
    );
}

export default InitialPage;
