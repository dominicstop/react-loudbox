import React from 'react';
import "./App.css";

import { ThemeProvider } from '@material-ui/core/styles';

import { ThemeConfig } from "constants/ThemeConfig";

import { LoginPage } from "pages/LoginPage";

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={ThemeConfig}>
        <div className={"app-root-container"}>
          <LoginPage/>
        </div>
      </ThemeProvider>
    );
  };
};
