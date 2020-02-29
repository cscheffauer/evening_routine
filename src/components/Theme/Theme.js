import React from 'react';
import { connect } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const mapStateToProps = state => {
    return {
        route: state.changeRoute.route,
        darkMode: state.changeDarkMode.darkMode                    // -''-
    }
}

const Theme = (props) => {
    const { darkMode } = props;
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode ? 'dark' : 'light',
                    primary: {
                        light: '#519DFF',
                        main: '#496AEA',
                        dark: '#4957D6',
                        // contrastText: will be calculated to contrast with palette.primary.main
                    },
                    secondary: {
                        light: '#FFCB49',
                        main: '#FBA435',
                        dark: '#F99433',
                    }
                },
            }),
        [darkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}


export default connect(mapStateToProps)(Theme);
