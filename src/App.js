import React from 'react';
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { AuthContext   } from 'contexts/AuthContext';
import { LazyPreload   } from 'functions/LazyPreload';
import { PreloadPages  } from 'functions/PreloadPages';
import { AuthStoreData } from 'functions/AuthStore';

import { LoadingPage       } from 'pages/LoadingPage';
import { ProtectedRoute    } from 'components/ProtectedRoute';
import { ProtectedRedirect } from 'components/ProtectedRedirect';

import { ROUTES, ROUTES_HOME, ROUTES_HOME_ADMIN } from 'constants/Routes';


// lazy import pages
const LoginPage     = LazyPreload(() => import('pages/LoginPage'    ));
const SignUpPage    = LazyPreload(() => import('pages/SignUpPage'   ));
const DashboardPage = LazyPreload(() => import('pages/DashboardPage'));
const NotFoundPage  = LazyPreload(() => import('pages/NotFoundPage' ));


//register pages to programtically preload later
PreloadPages.registerPages([
  { key: ROUTES.LOGIN    , pageComp: LoginPage    },
  { key: ROUTES.SIGNUP   , pageComp: SignUpPage   },
  { key: ROUTES.DASHBOARD, pageComp: DashboardPage},
]);


export default function App(){
  /** @type {AuthStoreData} */
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <div className={"app-root-container"}>
      <React.Suspense fallback={<LoadingPage/>}>
        <Router>
          <Switch>
            <Route exact path="/">
              <ProtectedRedirect
                routeLoggedIn     ={ROUTES_HOME.HOME}
                routeLoggedInAdmin={ROUTES_HOME_ADMIN.HOME}
                routeLoggedOut    ={ROUTES.LOGIN}
              />
            </Route>
            <Route 
              path={ROUTES.LOGIN}
              component={LoginPage}
            />
            <Route 
              path={ROUTES.SIGNUP}
              component={SignUpPage}
            />
            <Route 
              path={ROUTES.DASHBOARD}
              component={DashboardPage}
            />
            <Route 
              path={ROUTES.DASHBOARD_ADMIN}
              component={DashboardPage}
            />
            <Route component={NotFoundPage}/>
          </Switch>
        </Router>
      </React.Suspense>
    </div>
  );
};
