
import { EventEmitter } from 'eventemitter3';
import { LoginResponse } from 'models/LoginResponse';
import Cookies from 'js-cookie';


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
  static KEY_COOKIE = 'auth_cookie_token';
  static KEY_STORE  = 'auth_storage';

  constructor(){
    this.emitter = new EventEmitter();
  };

  isLoggedIn(){
    const token = Cookies.get(AuthStore.KEY_COOKIE);
    return (token != null);
  };

  /** set/update the stored auth value
   * @param {LoginResponse.structure} loginResponse 
   */
  setAuth(loginResponse){
    // save and persist the loginResponse object
    localStorage.setItem(AuthStore.KEY_STORE,
      JSON.stringify(loginResponse)
    );

    // set the auth cookie
    Cookies.set(AuthStore.KEY_COOKIE, loginResponse.token, {
      expires: new Date(loginResponse.expirationDate),
    });

    // notify the subscribers that auth has been updated
    this.emitter.emit(AuthStoreEvents.onAuthChange, 
      /** @type {AuthStoreData} */ {
      isLoggedIn: true,
      loginResponse,
    });
  };

  /** get the stored auth value
   * @returns {AuthStoreData}
   */
  getAuth(){
    // get the last saved loginResponse object
    const storeItem  = localStorage.getItem(AuthStore.KEY_STORE);
    const isLoggedIn = this.isLoggedIn();

    try {
      return {
        isLoggedIn,
        // try parsing the string saved in the auth store
        loginResponse: JSON.parse(storeItem),
      };

    } catch(error) {
      // JSON parse failed, return null
      console.log('getAuth Error: ', error);

      return {
        isLoggedIn,
        loginResponse: null,
      };
    };
  };

  /** remove the stored auth value  */
  resetAuth(){
    // clear the stored loginResponse object
    localStorage.removeItem(AuthStore.KEY_STORE);
    Cookies.remove(AuthStore.KEY_COOKIE);

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