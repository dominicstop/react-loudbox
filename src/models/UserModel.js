import * as Helpers from 'functions/helpers';

export class UserAddressModel {
  static structure = {
    /** @type {string} */ city      : null,
    /** @type {string} */ street    : null,
    /** @type {string} */ barangay  : null,
    /** @type {number} */ postalCode: null,
  };

  static factory(values = UserAddressModel.structure){
    return { ...UserAddressModel.structure, ...values };
  };
};

/** model for the user property in LoginResponse */
export class UserModel {
  static structure = {
    /** @type {string } */ id             : null,
    /** @type {boolean} */ isAdmin        : null,
    /** @type {string } */ bio            : null,
    /** @type {string } */ headline       : null,
    /** @type {string } */ email          : null,
    /** @type {string } */ contactId      : null,
    /** @type {string } */ dateCreated    : null,
    /** @type {string } */ dateUpdated    : null,
    /** @type {string } */ firstName      : null,
    /** @type {string } */ lastName       : null,
    /** @type {string } */ middleName     : null,
    /** @type {string } */ displayPhotoSrc: null,
    /// compound types -------------------------------------------
    /** @type {UserAddressModel.structure} */ address     : null,
    /** @type {Array.string              } */ phoneNumbers: null,
  };

  static factory(values = UserModel.structure){
    return { ...UserModel.structure, ...values };
  };
};

/** Enum of keys for UserAddressModel
 * @readonly
 * @enum {string}
 */
export const UserAddressModelKeys = {
  ...UserAddressModel.structure,
  ...Helpers.createEnumFromObject(UserAddressModel.structure)
};

/** Enum of keys for UserModelKeys
 * @readonly
 * @enum {string}
 */
export const UserModelKeys = {
  ...UserModel.structure,
  ...Helpers.createEnumFromObject(UserModel.structure)
};



