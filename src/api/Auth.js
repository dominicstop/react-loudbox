
import * as Endpoints from 'constants/Endpoints';

import { LoginPayload } from 'models/LoginPayload';
import { ErrorModel   } from 'models/ErrorModel';
import { LoginResponse, LoginResponseKeys } from 'models/LoginResponse';

import AuthStore from 'functions/AuthStore';

//#region - JSDOC Types
/**
 * @typedef  {Object } LoginResult
 * @property {boolean} isSuccess - is login successfull
 * optional values -----------------------------------------------------------------
 * @property {ErrorModel   .structure |undefined} loginResponse - error details/info
 * @property {LoginResponse.structure |undefined} error         - login data
 */
//#endregion


export const testLoginCredentials = LoginPayload.factory({
  username: 'admin@gmail.com',
  password: 'adminuser'
});

export class AuthLogin {
  /** possible error types based on the login response
   * @readonly
   * @enum {string}
   */
  static ERROR_TYPES = {
    CredentialsError  : 'CredentialsError'  ,
    EmptyEmail        : 'EmptyEmail'        ,
    EmptyPassword     : 'EmptyPassword'     ,
    EmptyEmailPassword: 'EmptyEmailPassword',
    UnknownError      : 'UnknownError'      ,
  };

  /** get the corresonding 'friendly' error message for errorType */
  static getErrorMessage(errorType){
    const { ERROR_TYPES } = AuthLogin;

    switch (errorType) {
      case ERROR_TYPES.CredentialsError  : return 'Invalid Email or Password';
      case ERROR_TYPES.EmptyEmail        : return 'Email cannot be empty';
      case ERROR_TYPES.EmptyPassword     : return 'Password cannot be empty';
      case ERROR_TYPES.EmptyEmailPassword: return 'Email and Password cannot be empty';
        
      case ERROR_TYPES.UnknownError:
      default: return 'Looks like something went wrong';
    };
  };

  /** get the error type based on the login response */
  static getErrorTypeFromResponse(response = {}){
    const { ERROR_TYPES } = AuthLogin;

    const isCredentialsError = (
      ('non_field_errors' in response             ) && 
      (Array.isArray(response['non_field_errors'])) &&
      (response['non_field_errors']?.[0] == 'Incorrect Credentials')
    );

    const isEmptyUsernameError = (
      ('username' in response          ) && 
      (Array.isArray(response.username)) &&
      (response.username?.[0] == 'This field may not be blank.') ||
      (response.username?.[0] == 'This field may not be null.' ) 
    );

    const isEmptyPasswordError = (
      ('password' in response          ) && 
      (Array.isArray(response.password)) &&
      (response.password?.[0] == 'This field may not be blank.') ||
      (response.password?.[0] == 'This field may not be null.' ) 
    );

    const isEmptyUsernamePassword = 
      (isEmptyUsernameError && isEmptyPasswordError);

    return (
      isCredentialsError     ? ERROR_TYPES.CredentialsError   :
      isEmptyUsernamePassword? ERROR_TYPES.EmptyEmailPassword :
      isEmptyUsernameError   ? ERROR_TYPES.EmptyEmail         :
      isEmptyPasswordError   ? ERROR_TYPES.EmptyPassword      : ERROR_TYPES.UnknownError
    );
  };

  /** checks whether the login was successful based on the response */
  static isLoginSuccess(response = {}){
    return (
      (LoginResponseKeys.user           in response) &&
      (LoginResponseKeys.token          in response) &&
      (LoginResponseKeys.expirationDate in response) 
    );
  };

  static async login(payload = LoginPayload.structure){
    const loginPayload = LoginPayload.factory(payload);
    
    try {
      const response = await fetch(Endpoints.loginURL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json',  },
        body: JSON.stringify(loginPayload)
      });

      // parse response and check if login success
      const json      = await response.json();
      const isSuccess = AuthLogin.isLoginSuccess(json);

      if(isSuccess){
        const loginResponse = LoginResponse.factory(json);
        AuthStore.setAuth(loginResponse);

        /** @type {LoginResult} */
        return { isSuccess: true, response: loginResponse };

      } else {
        const errorType    = AuthLogin.getErrorTypeFromResponse(json);
        const errorMessage = AuthLogin.getErrorMessage(errorType);

        const error = ErrorModel.factory({
          error       : JSON.stringify(json),
          errorKey    : errorType,
          errorMessage: errorMessage,
        });

        /** @type {LoginResult} */
        return { isSuccess: false, error };
      };

    } catch(error){
      const { ERROR_TYPES } = AuthLogin;

      const errorObj = ErrorModel.factory({
        error       : JSON.stringify(error),
        errorKey    : ERROR_TYPES.UnknownError,
        errorMessage: 'An unexpected error has occured',
      });

      /** @type {LoginResult} */
      return { isSuccess: false, error: errorObj };
    };
  };
};