import React from "react";

import AuthStore, { AuthStoreData } from 'functions/AuthStore';

/**
 * note: the values that we are passing down in this context
 * is the values we get from AuthStore, specifically: AuthStoreData
 */
export const AuthContext = React.createContext({});

export class AuthProvider extends React.Component {
  constructor(props){
    super(props);

    const { isLoggedIn, loginResponse } = AuthStore.getAuth();

    this.state = {
      // pass down values
      isLoggedIn, loginResponse
    };
  };

  componentDidMount(){
    AuthStore.onChangeSubscribe(this._handleOnChangeAuth);
  };

  componentWillUnmount(){
    AuthStore.onChangeUnsubscribe(this._handleOnChangeAuth);
  };

  /** listener for AuthStore changes
   * @param {AuthStoreData} authStoreData */
  _handleOnChangeAuth = (authStoreData) => {
    alert(JSON.stringify(authStoreData));
    this.setState({
      isLoggedIn   : authStoreData.isLoggedIn   ,
      loginResponse: authStoreData.loginResponse,
    });
  };

  render(){
    return(
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  };
};