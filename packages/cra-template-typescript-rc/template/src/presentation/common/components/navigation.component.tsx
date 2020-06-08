import React from 'react';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';
import {
    createStyles,
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
import { Container, Box } from '@material-ui/core';
import { RCTheme } from 'presentation/common/themes/theme.module';
import AppHeader from 'presentation/common/components/ui/app-header';
import { LoginComponent } from 'presentation/login/login.component';
import { ROUTES } from 'presentation/common/constants';
import { ExampleComponent } from 'presentation/example/example.component';
import { ExampleGridComponent } from 'presentation/example/components/grid-example.component';
import { ExampleTreeComponent } from 'presentation/example/components/tree-example.component';

const navHistory = createBrowserHistory();

const useStyles = makeStyles(theme =>
    createStyles({
        container: {
            background: '#f7f7f7',
            height: '100vh',
            border: '1px solid #EEE',
            padding: 0
        },
        appContainer: {
            padding: 42,
            minHeight: '0px'
        }
    })
);

const DefaultLayout = ({component: Component, ...rest }) => {
    const classes = useStyles({});
    return (
        <Route
            {...rest}
            render={matchProps => (
                <ThemeProvider theme={RCTheme}>
                    <Container className={classes.container} disableGutters maxWidth="xl">
                        <Box height={1} display="flex" flexDirection="column">
                            <Box height="75px">
                                <AppHeader />
                            </Box>
                            <Box flexGrow="1" className={classes.appContainer} display="flex">
                                <Component {...matchProps} />
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        />
    );
};

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (
                    children
                )
            }
        />
    );
} 

const NavigationComponent = () => {
    return (
        <Router history={ navHistory }>
            <Switch>
                <Route path={ROUTES.LOGIN}>
                    <LoginComponent />
                </Route>
                <Route path={ROUTES.EXAMPLE}>
                    <DefaultLayout component={ExampleComponent}/>
                </Route>
                <Route path={ROUTES.EXAMPLE_GRID}>
                    <DefaultLayout component={ExampleGridComponent}/>
                </Route>
                <Route path={ROUTES.EXAMPLE_TREE}>
                    <DefaultLayout component={ExampleTreeComponent}/>
                </Route>
            </Switch>
        </Router>
    )
};

export default NavigationComponent;
