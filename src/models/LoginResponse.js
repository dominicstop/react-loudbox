

import * as Helpers from 'functions/helpers';


const structure = {
  /** @type {string} */ token         : null,
  /** @type {string} */ expirationDate: null,
  /** @type {object} */ user          : null,
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

