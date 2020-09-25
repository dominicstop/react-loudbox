import React from 'react';
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { AuthContext   } from 'contexts/AuthContext';
import { LazyPreload   } from 'functions/LazyPreload';
import { PreloadPages  } from 'functions/PreloadPages';
import { AuthStoreData } from 'functions/AuthStore';

import { LoadingPage    } from 'pages/LoadingPage';
import { ProtectedRoute } from 'components/ProtectedRoute';

import { ROUTES } from 'constants/Routes';


// lazy import pages
const LoginPage     = LazyPreload(() => import('pages/LoginPage'    ));
const SignUpPage    = LazyPreload(() => import('pages/SignUpPage'   ));
const DashboardPage = LazyPreload(() => import('pages/DashboardPage'));


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
              {isLoggedIn
                ? <Redirect to={ROUTES.DASHBOARD}/> 
                : <Redirect to={ROUTES.LOGIN}/>
              }
            </Route>
            <Route 
              path={ROUTES.LOGIN}
              component={(isLoggedIn
                // expects comp so wrap redirect element
                ? () => <Redirect to={ROUTES.DASHBOARD} /> 
                : LoginPage
              )}
            />
            <Route 
              path={ROUTES.SIGNUP}
              component={SignUpPage}
            />
            <ProtectedRoute path={ROUTES.DASHBOARD}>
              <DashboardPage/>
            </ProtectedRoute>
          </Switch>
        </Router>
      </React.Suspense>
    </div>
  );
};
