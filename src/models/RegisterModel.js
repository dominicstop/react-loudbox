
import * as Helpers from 'functions/helpers';


const structure = {
  /** @type {string} */ id             : null,
  /** @type {string} */ contactId      : null,
  /** @type {string} */ displayPhotoSrc: null,
  /** @type {string} */ headline       : null,
  /** @type {string} */ bio            : null,
  /** @type {string} */ email          : null,
  /** @type {string} */ password       : null,
  /** @type {string} */ firstName      : null,
  /** @type {string} */ middleName     : null,
  /** @type {string} */ lastName       : null,
  /** @type {string} */ isActive       : null,
  /** @type {string} */ isAdmin        : null,
  /** @type {string} */ street         : null,
  /** @type {string} */ barangay       : null,
  /** @type {string} */ city           : null,
  /** @type {string} */ postalCode     : null,
  /** @type {string} */ province       : null,
  /** @type {string} */ phone1         : null,
  /** @type {string} */ phone2         : null,
  /** @type {string} */ dateCreated    : null,
  /** @type {string} */ dateUpdated    : null,
};

/** Enum of keys for RegisterModel
 * @readonly
 * @enum {string}
 */
export const RegisterKeys = {
  ...structure,
  ...Helpers.createEnumFromObject(structure)
};

// todo ?
// register model factory
export class RegisterModel {
  static factory(values = {...structure}){
    return values;
  };
};

