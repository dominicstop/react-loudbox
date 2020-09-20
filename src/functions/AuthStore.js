
import { EventEmitter } from 'eventemitter3';
import { LoginResponse } from 'models/LoginResponse';

//#region - JSDOC Types
/** 
 * the object that the AuthStore returns
 * @typedef  {Object } AuthStoreData
 * @property {boolean} isLoggedIn - whether or not the LoginResponse is valid
 * @property {LoginResponse.structure | undefined} loginResponse - the raw object that login api returns
 * 
 * callback for whenever there are changes to the auth store
 * @typedef {function(AuthStoreData):void} AuthStoreOnChangeCallback
 */
//#endregion


export const AuthStoreEvents = {
  'onAuthChange': 'onAuthChange',
};

class AuthStore {
  static STORE_KEY = 'auth_storage';

  /**
   * check if the login response is valid value for logging in
   * @param {LoginResponse.structure} loginResponse 
   */
  static verifyLoginResponse(loginResponse){
    // todo: add code to check if loginResponse is valid for logging in
    return loginResponse != null;
  };

  constructor(){
    this.emitter = new EventEmitter();
  };

  /** set/update the stored auth value */
  setAuth(loginResponse = LoginResponse.structure){
    // save and persist the loginResponse object
    localStorage.setItem(AuthStore.STORE_KEY, loginResponse);

    // notify the subscribers that auth has been updated
    this.emitter.emit(AuthStoreEvents.onAuthChange, 
      /** @type {AuthStoreData} */ {
      isLoggedIn: AuthStore.verifyLoginResponse(loginResponse),
      loginResponse,
    });
  };

  /** get the stored auth value
   * @returns {AuthStoreData}
   */
  getAuth(){
    // get the last saved loginResponse object
    const loginResponse = localStorage.getItem(AuthStore.STORE_KEY);

    return {
      isLoggedIn: AuthStore.verifyLoginResponse(loginResponse),
      loginResponse,
    };
  };

  /** remove the stored auth value  */
  resetAuth(){
    // clear the stored loginResponse object
    localStorage.removeItem(AuthStore.STORE_KEY);

    // notify the subscribers that auth has cleared
    this.emitter.emit(AuthStoreEvents.onAuthChange, 
      /** @type {AuthStoreData} */ {
      isLoggedIn: false,
      loginResponse: null,
    });
  };

  /** subscribe/listen to auth store changes
   * @param {AuthStoreOnChangeCallback} callback 
   */
  onChangeSubscribe(callback){
    this.emitter.addListener(
      AuthStoreEvents.onAuthChange, callback
    );
  };

  /** remove listener for auth store changes
   * @param {AuthStoreOnChangeCallback} callback 
   */
  onChangeUnsubscribe(callback){
    this.emitter.removeListener(
      AuthStoreEvents.onAuthChange, callback
    );
  };
};

// export as singleton
export default new AuthStore();