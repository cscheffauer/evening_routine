import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import { GOALS_ROUTE } from '../../../constants';


const InitialPage = (props) => {
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
    }, [firstTimeVisited, initialSnackBarOpen])


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
