import React from 'react';
import "./App.css";

import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"

import { AuthContext    } from 'contexts/AuthContext';
import { AuthStoreData  } from 'functions/AuthStore';
import { ProtectedRoute } from 'components/ProtectedRoute';

import { LoginPage  } from "pages/LoginPage";
import { SignUpPage } from "pages/SignUpPage";
import { HomePage   } from "pages/HomePage";


export default function App(){
  /** @type {AuthStoreData} */
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <div className={"app-root-container"}>
      <Router>
        <AnimatePresence initial={true} exitBeforeEnter>
          <Switch>
            <Route exact path="/">
              {isLoggedIn
                ? <Redirect to="/home" /> 
                : <Redirect to="/login"/>
              }
            </Route>
            <Route 
              path="/login"
              component={(isLoggedIn
                // expects comp so wrap redirect element
                ? () => <Redirect to="/home" /> 
                : LoginPage
              )}
            />
            <Route path="/signup">
              <SignUpPage/>
            </Route>
            <ProtectedRoute path="/home">
              <HomePage/>
            </ProtectedRoute>
          </Switch>
        </AnimatePresence>
      </Router>
    </div>
  );
};
