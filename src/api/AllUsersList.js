import * as Endpoints from 'constants/Endpoints';
import { ErrorModel } from 'models/ErrorModel';


/** @type {CacheItem}*/
let cachedUsersList = {
  data     : []   ,
  hasCache : false,
  timestamp: null ,
};

export class AllUsersList {
  static KEY_STORE = 'all_users_list';

  /** persist + cache files for later
   * @param {CacheItem} cacheItem 
   */
  static save(cacheItem){
    // update the files cache
    cachedUsersList = cacheItem;

    // save and persist the cache storage
    localStorage.setItem(AllUsersList.KEY_STORE,
      JSON.stringify(cacheItem)
    );
  };
  
  static async fetch(){
    try {
      const response = await fetch(Endpoints.userListURL, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      });

      /** @type {*[]} */
      const data = await response.json() ?? [];

      console.log('AllUsersList', data);

      const date      = new Date();
      const timestamp = date.getTime();

      // cache + save files for later
      AllUsersList.save({
        hasCache: true, data, timestamp,
      });

      return { 
        data, timestamp, 
        error: null,
        isSuccess: true,
      };

    } catch(error){
      console.log('AllUsersList - fetch error', error);
      const date = new Date();

      return { 
        isSuccess: true, 
        data: [], 
        timestamp: date.getTime(),
        error: ErrorModel.factory({
          errorMessage: 'Unable to get users list',
          error,
        }),
      };
    };
  };

  /** 
   * get the data from the cache or localStorage
   * @param   {boolean} readStore - if local cache is empty, read from store
   * @returns {CacheItem} */
  static getCached(readStore = true){
    const emptyCache = {
      data: [],
      hasCache: false,
      timestamp: null,
    };

    if(cachedUsersList.hasCache){
      return cachedUsersList;

    } else if(!readStore){
      return emptyCache;
    };

    try {
      /** @type {CacheItem} */
      const cacheItem = JSON.parse(
        localStorage.getItem(AllUsersList.KEY_STORE)
      );

      const hasCache = (
        cacheItem?.hasCache &&
        cacheItem?.timestamp
      );

      // guard: early exit - no cache
      if(!hasCache) return emptyCache;

      cachedUsersList = cacheItem;
      return cacheItem;
      
    } catch(error){
      console.log('AllUsersList - getCached error', error);
      return emptyCache;
    };
  };

  static clearStore(){
    cachedUsersList.hasCache = false;
    cachedUsersList.timestamp = null;
    cachedUsersList.data = [];

    localStorage.removeItem(AllUsersList.KEY_STORE);
  };
};