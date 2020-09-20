import React from "react";

import { ThemeProvider } from '@material-ui/core/styles';

import { ThemeConfig } from "constants/ThemeConfig";
import { AuthProvider } from 'contexts/AuthContext';

/**
 * Wrapper component to pass all root contexts to the child component.
 * Used in `App.js` to pass down all the contexts at once
 */
export function RootContextProvider(props){
  return(
    <ThemeProvider theme={ThemeConfig}>
      <AuthProvider>
        {props.children}
      </AuthProvider>
    </ThemeProvider>
  );
};