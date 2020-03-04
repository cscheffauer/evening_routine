import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';


import './Header.css';
import { TODAY_ROUTE, HISTORY_ROUTE, MOTIVATION_ROUTE, GOALS_ROUTE } from '../../../constants';


const drawerWidth = 200;
const routes = [{
    route: TODAY_ROUTE,
    text: 'Today',
    icon: <TodayIcon />
}, {
    route: HISTORY_ROUTE,
    text: 'History',
    icon: <DateRangeIcon />
}, {
    route: MOTIVATION_ROUTE,
    text: 'Motivaton',
    icon: <InsertEmoticonIcon />
}, {
    route: GOALS_ROUTE,
    text: 'Goals',
    icon: <AssessmentIcon />
}];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.down('sm')]: {
            height: 56,
        },
        [theme.breakpoints.up('sm')]: {
            height: 64,
        },
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarHeadline: {
        [theme.breakpoints.down('sm')]: {
            margin: 'auto',
        },
        [theme.breakpoints.up('sm')]: {
            margin: 'unset',
        },
    },
    menuButton: {
        position: 'absolute',
        left: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    darkModeButton: {
        position: 'absolute',
        right: theme.spacing(2),
        transform: 'rotate(-215deg)'
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Header = ({ onRouteChange, onDarkModeChange, darkMode, goalsSet }) => {
    //const { container } = props;
    goalsSet = true;    //for testing purpose

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {goalsSet ?
                    routes.map((object, index) => (
                        <ListItem onClick={() => onRouteChange(object.route)} button key={object.text}>
                            <ListItemIcon>
                                {object.icon}
                            </ListItemIcon>
                            <ListItemText primary={object.text} />
                        </ListItem>
                    )) :
                    routes.map((object, index) => (
                        object.route === GOALS_ROUTE ?
                            <ListItem onClick={() => onRouteChange(object.route)} button key={object.text}>
                                <ListItemIcon>
                                    {object.icon}
                                </ListItemIcon>
                                <ListItemText primary={object.text} />
                            </ListItem>
                            :
                            <ListItem disabled button key={object.text}>
                                <ListItemIcon>
                                    {object.icon}
                                </ListItemIcon>
                                <ListItemText primary={object.text} />
                            </ListItem>
                    ))
                }
            </List>
        </div>
    );

    const HtmlTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: theme.palette.grey.A200,
            color: 'rgba(0, 0, 0, 1)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography className={classes.appBarHeadline} variant="h6" noWrap>
                        Evening Routine
                            </Typography>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit">Change Color Mode</Typography>
                                {"(depending on"} <b>{'time of day'}</b> {")"}
                            </React.Fragment>
                        }
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={() => onDarkModeChange(!darkMode)}
                            className={classes.darkModeButton}
                        >
                            {darkMode && <Brightness2Icon />}
                            {!darkMode && <WbSunnyIcon />}
                        </IconButton>
                    </HtmlTooltip>

                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        //container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

        </div>
    );
}


export default Header;