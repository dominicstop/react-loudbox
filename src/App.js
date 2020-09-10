import React from 'react';
import "./App.css";

import { LoginPage } from "pages/LoginPage";

export default class App extends React.Component {
  render() {
    return (
      <div className={"app-root-container"}>
        <LoginPage/>
      </div>
    );
  }
}
