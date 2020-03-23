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

    const [initialSnackBarOpen, setInitialSnackBarOpen] = React.useState(false);
    const [firstTimeVisited, setFirstTimeVisited] = React.useState(true);

    const handleCloseAndGoals = () => {
        setFirstTimeVisited(false);
        setInitialSnackBarOpen(false);
        onRouteChange(GOALS_ROUTE);
    }

    useEffect(() => {
        if (firstTimeVisited) {
            const timer = setTimeout(() => {
                setInitialSnackBarOpen(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [initialSnackBarOpen])


    return (
        <Container>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                key={`center,bottom`}
                open={initialSnackBarOpen}
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
