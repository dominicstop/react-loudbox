//#region - JSDOC Types
/** 
 * @typedef  {Object} PageMapItem
 * @property {string} key      - unique page key
 * @property {object} pageComp - LazyPreload object
 */
//#endregion

let pageMap = {};

export class PreloadPages {
  /** Register pages to preload later
   * @param {[PageMapItem]} pages 
   */
  static registerPages(pages){
    for(const page of pages){
      pageMap[page.key] = page.pageComp;
    };
  };

  /**
   * @param {string} key 
   */
  static async preloadPage(key){
    const page = pageMap[key];
    return await page?.preload?.();
  };
};