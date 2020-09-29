import * as Endpoints from 'constants/Endpoints';
import { ErrorModel } from 'models/ErrorModel';
import { FileManagementResponse } from 'models/FileManagementResponse';

/**
 * @typedef CacheItemFiles
 * @property {boolean} hasCache  - whether or not the files was prev. cached
 * @property {number } timestamp - the time the files were fetched from the API
 * @property {FileManagementResponse.structure[]} data - the files fetched from the API
 */

/** @type {CacheItemFiles}*/
let cachedFiles = {
  data     : []   ,
  hasCache : false,
  timestamp: null ,
};

export class FileManagement {
  static KEY_STORE = 'file_management_items';

  /** persist + cache files for later
   * @param {CacheItemFiles} cacheItem 
   */
  static save(cacheItem){
    // update the files cache
    cachedFiles = cacheItem;

    // save and persist the cache storage
    localStorage.setItem(FileManagement.KEY_STORE,
      JSON.stringify(cacheItem)
    );
  };

  static async fetch(){
    try {
      const response = await fetch(Endpoints.fileManagementURL, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      });

      /** @type {FileManagementResponse.structure[]} */
      const data = await response.json() ?? [];

      const date      = new Date();
      const timestamp = date.getTime();

      // cache + save files for later
      FileManagement.save({
        hasCache: true, data, timestamp,
      });

      return { 
        data, timestamp, 
        error: null,
        isSuccess: true,
      };

    } catch(error){
      console.log('FileManagement - getFiles error', error);
      const date = new Date();

      return { 
        isSuccess: true, 
        data: [], 
        timestamp: date.getTime(),
        error: ErrorModel.factory({
          errorMessage: 'Unable to get files',
          error,
        }),
      };
    };
  };

  /** 
   * get the files from the cache or localStorage
   * @param   {boolean} readStore - if local cache is empty, read from store
   * @returns {CacheItemFiles} */
  static getCached(readStore = true){
    const emptyCache = {
      data: [],
      hasCache: false,
      timestamp: null,
    };

    if(cachedFiles.hasCache){
      return cachedFiles;

    } else if(!readStore){
      return emptyCache;
    };

    try {
      /** @type {CacheItemFiles} */
      const cacheItem = JSON.parse(
        localStorage.getItem(FileManagement.KEY_STORE)
      );

      const hasCache = (
        cacheItem?.hasCache &&
        cacheItem?.timestamp
      );

      // guard: early exit - no cache
      if(!hasCache) return emptyCache;

      cachedFiles = cacheItem;
      return cacheItem;
      
    } catch(error){
      console.log('FileManagement - getCached error', error);
      return emptyCache;
    };
  };

  static clearStore(){
    cachedFiles.hasCache = false;
    cachedFiles.timestamp = null;
    cachedFiles.data = [];

    localStorage.removeItem(FileManagement.KEY_STORE);
  };
};
