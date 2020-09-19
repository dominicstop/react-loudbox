

import * as Helpers from 'functions/helpers';


const structure = {
  /** @type {object} */ error       : null,
  /** @type {string} */ errorKey    : null,
  /** @type {string} */ errorMessage: null,
};

/** Enum of keys for ErrorModel
 * @readonly
 * @enum {string}
 */
const ErrorKeys = {
  ...structure,
  ...Helpers.createEnumFromObject(structure)
};

export class ErrorModel {
  static structure = structure;

  static factory(values = {...structure}){
    return { ...structure, values };
  };
};

