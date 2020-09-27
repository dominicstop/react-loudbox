
import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { AuthStoreData } from 'functions/AuthStore';

/**
 * Redirect to the specified routes based on the current auth data
 * @param {Object} props
 * @param {string} props.routeLoggedOut     - Redirect to this route when regular user
 * @param {string} props.routeLoggedIn      - Redirect to this route when logged in + 
 * @param {string} props.routeLoggedInAdmin - Redirect to this route when logged in + user is admin
 */
export function ProtectedRedirect(props){
  const { children, ...routeProps } = props;

  /** @type {AuthStoreData}*/
  const { isLoggedIn, loginResponse } = React.useContext(AuthContext);
  const isAdmin = loginResponse?.user?.isAdmin;

  return (
    <Route {...routeProps} 
      render={() => (
        isAdmin   ? <Redirect to={props.routeLoggedInAdmin}/> :
        isLoggedIn? <Redirect to={props.routeLoggedIn     }/> :
          // default: not logged in ----------------
          <Redirect to={props.routeLoggedOut}/>
      )}
    />
  );
};