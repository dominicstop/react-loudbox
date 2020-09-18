import React from 'react';
import "./App.css";

import { ThemeProvider } from '@material-ui/core/styles';

import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import { ThemeConfig } from "constants/ThemeConfig";
import { ProtectedRoute } from 'components/ProtectedRoute';

import { LoginPage  } from "pages/LoginPage";
import { SignUpPage } from "pages/SignUpPage";
import { HomePage   } from "pages/HomePage";


export default function App(){
  const loggedIn = false;

  return (
    <ThemeProvider theme={ThemeConfig}>
      <div className={"app-root-container"}>
        <Router>
          <Switch>
            <Route exact path="/">
              {loggedIn
                ? <Redirect to="/home" /> 
                : <Redirect to="/login"/>
              }
            </Route>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/signup">
              <SignUpPage/>
            </Route>
            <ProtectedRoute exact path="/home">
              <HomePage/>
            </ProtectedRoute>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};
