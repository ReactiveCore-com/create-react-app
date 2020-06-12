import React, { useEffect } from 'react';
import {
    Router,
    Switch,
    Route,
    Redirect
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
import { mediateRequestSalesInfo } from 'mediator';
import { RequestSalesInfoSignal } from "presentation/events"; 

const navHistory = createBrowserHistory();

let requestSalesInfoDataSignal = new RequestSalesInfoSignal();

navHistory.listen((location, action) => {
    switch (location.pathname) {
        case ROUTES.EXAMPLE_GRID: 
            requestSalesInfoDataSignal.dispatch();
            break;
        default:
          break;
      }
});

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

const LoginLayout = ({component: Component, ...rest }) => {
    const classes = useStyles({});
    return (
        <Route
            {...rest}
            render={matchProps => (
                <ThemeProvider theme={RCTheme}>
                    <Container className={classes.container} disableGutters maxWidth="xl">
                        <Box height={1} display="flex" flexDirection="column">
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


//NOTE for auth gated routes
//see https://reacttraining.com/react-router/web/example/auth-workflow
const NavigationComponent = () => {
    useEffect(() => {
        let mediator = mediateRequestSalesInfo(requestSalesInfoDataSignal);
        return mediator.destroy;
    }, []);

    return (
        <Router history={ navHistory }>
            <Switch>
                <Redirect exact from={ROUTES.ROOT} to={ROUTES.LOGIN} />
                <Route path={ROUTES.LOGIN}>
                    <LoginLayout component={LoginComponent}>
                    </LoginLayout>
                </Route>
                <Route path={ROUTES.EXAMPLE}>
                    <DefaultLayout component={ExampleComponent}/>
                </Route>
                <Route path={ROUTES.EXAMPLE_GRID}>
                    <DefaultLayout component={ExampleGridComponent}/>
                </Route>
            </Switch>
        </Router>
    )
};

export default NavigationComponent;
