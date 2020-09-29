import * as Helpers from 'functions/helpers';


const structure = {
  /** @type {string} */ id           : null,
  /** @type {string} */ notes        : null,
  /** @type {string} */ fileName     : null,
  /** @type {string} */ category     : null,
  /** @type {string} */ dateTimestamp: null,
  /** @type {string} */ upload       : null,
};

/** Enum of keys for FileManagementResponse
 * @readonly
 * @enum {string}
 */
export const FileManagementResponseKeys = {
  ...structure,
  ...Helpers.createEnumFromObject(structure)
};

export class FileManagementResponse {
  static structure = structure;

  static factory(values = structure){
    return { ...structure, ...values };
  };
};