import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { AuthStoreData } from 'functions/AuthStore';
import AccessDeniedPage from 'pages/AccessDeniedPage';
import { ROUTES } from 'constants/Routes';


/**
 * All the possible `withAuthRedirect` mode values - same as the `AuthRedirectMode` enum
 * @typedef {"OnlyAdmin" | "OnlyUser" | "OnlyLoggedIn" | "OnlyLoggedOut"} AuthRedirectModeItem
 */


/** @enum {string} */
export const AuthRedirectMode = {
  OnlyAdmin    : 'OnlyAdmin'    ,
  OnlyUser     : 'OnlyUser'     ,
  OnlyLoggedIn : 'OnlyLoggedIn' ,
  OnlyLoggedOut: 'OnlyLoggedOut',
};

/**
 * HOC for wrapping a component so that it's only accessible based on mode rule
 * @param {ReactElement        } WrappedComponent - Component to render
 * @param {AuthRedirectModeItem} mode             - AuthRedirectMode item
 */
export function withAuthRedirect(WrappedComponent, mode){
  return function(props){
    /** @type {AuthStoreData}*/
    const { isLoggedIn, loginResponse } = React.useContext(AuthContext);
    const isAdmin = loginResponse?.user?.isAdmin;

    switch (mode) {
      case AuthRedirectMode.OnlyAdmin: return(
        (isLoggedIn && isAdmin)? <WrappedComponent {...props}/> :
        (isLoggedIn           )? <AccessDeniedPage/>            :
        // default: not logged in ---
        <Redirect to={ROUTES.LOGIN}/>
      );
      case AuthRedirectMode.OnlyUser: return(
        (isLoggedIn && !isAdmin)? <WrappedComponent {...props}/> :
        (isLoggedIn &&  isAdmin)? <AccessDeniedPage/>            :
        // default: not logged in ---
        <Redirect to={ROUTES.LOGIN}/>
      );
      case AuthRedirectMode.OnlyLoggedIn: return(isLoggedIn
        ? <WrappedComponent {...props}/>
        : <Redirect to={ROUTES.LOGIN}/>
      );
      case AuthRedirectMode.OnlyLoggedOut: return(!isLoggedIn
        ? <WrappedComponent {...props}/>
        : <Redirect to={'/'}/>
      );
      default: return(
        <WrappedComponent {...props}/>
      );
    };
  };
};