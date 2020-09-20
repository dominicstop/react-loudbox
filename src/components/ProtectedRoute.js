
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from 'contexts/AuthContext';
import { AuthStoreData } from 'functions/AuthStore';


export function ProtectedRoute(props){
  const { children, ...routeProps } = props;

  /** @type {AuthStoreData}*/
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <Route {...routeProps} 
      render={(props) => (isLoggedIn
        ? React.cloneElement(children, props)
        : <Redirect to={props.redirectTo ?? '/login'} />
    )}/>
  );
};