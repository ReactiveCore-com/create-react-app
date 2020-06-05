import React from 'react';
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
import { store } from 'core/managers/state-manager';
import { createBrowserHistory } from "history";
import { Container, Box } from '@material-ui/core';
import { RCTheme } from 'common/themes/theme.module';
import AppHeader from 'common/components/ui/app-header';
import { fakeAuth } from 'login/auth.service';
import { LoginComponent } from 'login/login.component';
import { BeginComponent } from './begin';
import { GuidelineManagerComponent } from 'guideline/guideline-manager/components/guideline.component';
import { GuidelineEditor } from 'guideline/guideline-editor/guideline-editor.component';
import { PathwayComponent } from './decision-visualizer/pathway.component';
import { DecisionTreeComponent } from './decision-visualizer/decision-tree.component';
import { ROUTES } from 'common/constants';
import { mediateNavigateToTreeView } from 'mediators/navigate-to-tree-view-requester.mediator';

const navHistory = createBrowserHistory();

navHistory.listen((location, action) => {
    switch (location.pathname) {
        case (location.pathname.match(/\/guideline\//) || {}).input:
            store.dispatch({
                type: 'RESET_STATE',
                payload: 'guidelineEditor'
            })
          break;
        case ROUTES.PATHWAY_VISUALISER : 
            store.dispatch({
                type: 'RESET_STATE',
                payload: 'pathwayVisualiser'
            })
            break;
        case ROUTES.TREE_VISUALISER : 
            store.dispatch(mediateNavigateToTreeView());
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
            minHeight: '500px',
            minWidth: '1400px',
            maxWidth: 'none',
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
                    <Container className={classes.container} fixed>
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
                fakeAuth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.LOGIN,
                            state: { from: location }
                        }}
                    />
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
                <PrivateRoute path={ROUTES.GUIDELINE_EDITOR}>
                    <DefaultLayout component={GuidelineEditor}/>
                </PrivateRoute>
                <PrivateRoute path={ROUTES.GUIDELINE_MANAGER}>
                    <DefaultLayout component={GuidelineManagerComponent}/>
                </PrivateRoute>
                <PrivateRoute path={ROUTES.PATHWAY_VISUALISER}>
                    <DefaultLayout component={PathwayComponent}/>
                </PrivateRoute>
                <PrivateRoute path={ROUTES.TREE_VISUALISER}>
                    <DefaultLayout component={DecisionTreeComponent}/>
                </PrivateRoute>
                <PrivateRoute path={ROUTES.BEGIN}>
                    <DefaultLayout component={BeginComponent}/>
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default NavigationComponent;
