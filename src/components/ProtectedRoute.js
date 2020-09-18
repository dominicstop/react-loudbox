
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export class ProtectedRoute extends React.Component {

  render() {
    const { children, ...routeProps } = this.props;
    const isAuthenticated = false; //todo

    return (
      <Route {...routeProps} 
        render={(props) => (isAuthenticated
          ? React.cloneElement(children, props)
          : <Redirect to='/login' />
      )}/>
    );
  };
};