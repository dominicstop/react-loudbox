import React from 'react';
import "./App.css";

import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"

import { ThemeConfig } from "constants/ThemeConfig";
import { ProtectedRoute } from 'components/ProtectedRoute';

import { LoginPage  } from "pages/LoginPage";
import { SignUpPage } from "pages/SignUpPage";
import { HomePage   } from "pages/HomePage";

export default function App(){
  const loggedIn = true;

  return (
    <ThemeProvider theme={ThemeConfig}>
      <div className={"app-root-container"}>
        <Router>
          <AnimatePresence initial={true} exitBeforeEnter>
            <Switch>
              <Route exact path="/">
                {loggedIn
                  ? <Redirect to="/home" /> 
                  : <Redirect to="/login"/>
                }
              </Route>
              <Route 
                path="/login"
                component={LoginPage}
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
    </ThemeProvider>
  );
};
