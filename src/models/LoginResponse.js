

import * as Helpers from 'functions/helpers';

import { UserModel } from 'models/UserModel';


const structure = {
  /** @type {string} */ token         : null,
  /** @type {string} */ expirationDate: null,
  /// comppund types ---------------------------
  /** @type {UserModel.structure} */ user: null,
};

/** Enum of keys for LoginResponse
 * @readonly
 * @enum {string}
 */

export const LoginResponseKeys = {
  ...structure,
  ...Helpers.createEnumFromObject(structure)
};


export class LoginResponse {
  static structure = structure;

  static factory(values = structure){
    return { ...structure, ...values };
  };
};

