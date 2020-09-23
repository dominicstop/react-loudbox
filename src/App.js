import React from 'react';

import "./App.css";

import { motion, AnimatePresence } from "framer-motion"
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import { AuthContext   } from 'contexts/AuthContext';
import { LazyPreload   } from 'functions/LazyPreload';
import { PreloadPages  } from 'functions/PreloadPages';
import { AuthStoreData } from 'functions/AuthStore';

import { LoadingPage    } from 'pages/LoadingPage';
import { ProtectedRoute } from 'components/ProtectedRoute';

import { ROUTES } from 'constants/Routes';


// lazy import pages
const LoginPage  = LazyPreload(() => import('pages/LoginPage' ));
const SignUpPage = LazyPreload(() => import('pages/SignUpPage'));
const HomePage   = LazyPreload(() => import('pages/HomePage'  ));


//register pages to programtically preload later
PreloadPages.registerPages([
  { key: ROUTES.LOGIN , pageComp: LoginPage  },
  { key: ROUTES.SIGNUP, pageComp: SignUpPage },
  { key: ROUTES.HOME  , pageComp: HomePage   },
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
                ? <Redirect to={ROUTES.HOME} /> 
                : <Redirect to={ROUTES.LOGIN}/>
              }
            </Route>
            <Route 
              path={ROUTES.LOGIN}
              component={(isLoggedIn
                // expects comp so wrap redirect element
                ? () => <Redirect to={ROUTES.HOME} /> 
                : LoginPage
              )}
            />
            <Route 
              path={ROUTES.SIGNUP}
              component={SignUpPage}
            />
            <ProtectedRoute path={ROUTES.HOME}>
              <HomePage/>
            </ProtectedRoute>
          </Switch>
        </Router>
      </React.Suspense>
    </div>
  );
};
