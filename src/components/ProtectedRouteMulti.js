
import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { AuthStoreData } from 'functions/AuthStore';
import { ROUTES } from 'constants/Routes';

/**
 * @param {Object      } props
 * @param {ReactElement} props.loggedOut     - render comp. when logged out
 * @param {ReactElement} props.loggedIn      - render comp. when logged in + regular user
 * @param {ReactElement} props.loggedInAdmin - render comp. when logged in + user is admin
 */
export function ProtectedRouteMulti(props){
  const { children, ...routeProps } = props;

  /** @type {AuthStoreData}*/
  const { isLoggedIn, loginResponse } = React.useContext(AuthContext);
  const isAdmin = loginResponse?.user?.isAdmin;

  return (
    <Route {...routeProps} 
      render={(routeProps) => (
        isAdmin   ? React.cloneElement(props.loggedInAdmin, routeProps) :
        isLoggedIn? React.cloneElement(props.loggedIn     , routeProps) :
          // default: not logged in ----------------
          React.cloneElement(props.loggedOut, routeProps)
      )}
    />
  );
};