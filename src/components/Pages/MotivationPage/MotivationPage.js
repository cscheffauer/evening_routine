import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ImageLoader from '../../Tools/ImageLoader/ImageLoader';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LoadingSpinner from '../../../components/Layout/LoadingSpinner/LoadingSpinner';

import { quotes } from '../../../data';

const imgDimensions = {
    maxHeight: '50vh',
    maxWidth: '50vw',
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            height: '80vh',
        },
        [theme.breakpoints.up('md')]: {
            height: 'calc(100vh - (112px))',
        }
    },
    imgQuote: {
        maxWidth: imgDimensions.maxWidth,
        maxHeight: imgDimensions.maxHeight,
    },
    boxQuote: {
        marginTop: 20,
    },
    typoQuote: {
        fontSize: "3vh"
    },
    typoQuoteAuthor: {
        fontSize: "2vh"
    },
    show: {
        opacity: 1,
    },
    hide: {
        opacity: 0,
        width: 0,
        height: 0,
    }

}));

const MotivationPage = (props) => {
    const { darkMode } = props;
    const classes = useStyles();
    const [randomQuote, setRandomQuote] = useState({});
    const [quoteLoaded, setQuoteLoaded] = useState(false);

    const onQuoteLoaded = () => {
        console.log("set quote loaded to true");
        setQuoteLoaded(true);
    }
    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.motivationQuotes.length);
        const newRandomQuote = quotes.motivationQuotes[randomIndex];
        (newRandomQuote !== randomQuote) && setRandomQuote(newRandomQuote);
    }
    useEffect(() => {
        getRandomQuote();
        setQuoteLoaded(false);
        console.log("effect - set quote loaded to false");
    }, []);


    return (
        <Container className={classes.container}>
            <Box className={quoteLoaded ? classes.show : classes.hide}>
                <Box className={classes.boxImage}>
                    <ImageLoader
                        src={randomQuote.imageUrl}
                        className={classes.imgQuote}
                        onQuoteLoaded={onQuoteLoaded}
                    />
                </Box>
                <Box className={classes.boxQuote}>
                    <Typography className={classes.typoQuote}>
                        "{randomQuote.quote}"
                    </Typography>
                    <Typography className={classes.typoQuoteAuthor}>
                        {randomQuote.author}
                    </Typography>
                </Box>
            </Box>
            <LoadingSpinner className={quoteLoaded ? classes.hide : classes.show} />
        </Container>);
}

export default MotivationPage;


