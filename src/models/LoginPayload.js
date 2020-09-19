
import * as Helpers from 'functions/helpers';


const structure = {
  /** @type {string} */ username: null,
  /** @type {string} */ password: null
};

/** Enum of keys for LoginPayload
 * @readonly
 * @enum {string}
 */
export const LoginPayloadKeys = {
  ...structure,
  ...Helpers.createEnumFromObject(structure)
};

export class LoginPayload {
  static structure = structure;

  static factory(values = structure){
    return { ...structure, ...values };
  };
};

