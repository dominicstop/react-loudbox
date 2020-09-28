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

import { ROUTES, ROUTES_DASHBOARD, ROUTES_DASHBOARD_ADMIN } from 'constants/Routes';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


// lazy import pages
const LoginPage     = LazyPreload(() => import('pages/LoginPage'    ));
const SignUpPage    = LazyPreload(() => import('pages/SignUpPage'   ));
const DashboardPage = LazyPreload(() => import('pages/DashboardPage'));
const NotFoundPage  = LazyPreload(() => import('pages/NotFoundPage' ));


//register pages to programtically preload later
PreloadPages.registerPages([
  { key: ROUTES.LOGIN    , pageComp: LoginPage     },
  { key: ROUTES.SIGNUP   , pageComp: SignUpPage    },
  { key: ROUTES.DASHBOARD, pageComp: DashboardPage },
]);


export default function App(){
  /** @type {AuthStoreData} */
  const { loginResponse } = React.useContext(AuthContext);
  const isAdmin = loginResponse?.user?.isAdmin;

  return (
    <div className={"app-root-container"}>
      <React.Suspense fallback={<LoadingPage/>}>
        <Router>
          <Switch>
            <Route exact path="/">
              <ProtectedRedirect
                routeLoggedIn     ={ROUTES_DASHBOARD      .HOME}
                routeLoggedInAdmin={ROUTES_DASHBOARD_ADMIN.HOME}
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
              component={withAuthRedirect(DashboardPage, 'OnlyUser')}
            />
            <Route
              path={ROUTES.DASHBOARD_ADMIN}
              component={withAuthRedirect(DashboardPage, 'OnlyAdmin')}
            />
            <Route component={NotFoundPage}/>
          </Switch>
        </Router>
      </React.Suspense>
    </div>
  );
};
