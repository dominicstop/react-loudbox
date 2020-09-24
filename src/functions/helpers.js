
//wrapper func for setstate that returns a promise
export function setStateAsync(that, newState) {
  return new Promise((resolve) => {
      that.setState(newState, () => {
          resolve();
      });
  });
};

//wrapper for timeout that returns a promise
export function timeout(ms) {
  return new Promise(resolve => {
    const timeoutID = setTimeout(() => {
      clearTimeout(timeoutID);
      resolve();
    }, ms)
  });
};

export function promiseWithTimeout({ms, promise, shouldReject = true}){
  // Create a promise that rejects in <ms> milliseconds
  const timeoutPromise = new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => {
      clearTimeout(timeoutID);
      (shouldReject? reject : resolve)(`Promise timed out in ${ms} ms.`);
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeoutPromise]);
};

//pick a random item from an array
export function randomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
};

//when i exceeds max, go back to zero
export function returnToZero(i, max){
  let mod = i % (max + 1);
  return i <= max? i : mod;
};

export function plural(string = "", count = 0, suffix = 's'){
  return string + ((count > 1 || count == 0)? suffix : '');
};

/** returns undefined when index is invalid */
export function getLast(array) {
  return array[array.length - 1];
};

/** returns undefined when index is invalid */
export function getFirst(array) {
  return array[0];
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function getLetter(index = 0){
  return alphabet[index];
};

export function isValidTimestamp(timestamp){
  return (new Date(timestamp)).getTime() > 0;
};

export function isStringEmpty(string){
  const text = string || '';
  return (text.length == 0) || (text == '');
};

export function hexToRGBA(hex, opacity){
  let c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c= hex.substring(1).split('');
    if(c.length== 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    };
    c= '0x'+c.join('');
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + opacity + ')';
  };
  throw new Error('Bad Hex');
};

const isDataUrlRegex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
export function isDataURL(s) {
  return !!s.match(isDataUrlRegex);
};

/** returns null if not valid */
export function getBase64MimeType(encoded = '') {
  if (typeof encoded !== 'string') return null;
  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    return mime[1];
  };
};

const imageMimeTypes = ['image/png', 'image/jpeg'];
export function isMimeTypeImage(type){
  return imageMimeTypes.includes(type)
};

export function isBase64Image(photouri){
  //check if uri is valid base64
  const isBase64 = isDataURL(photouri);
  //check if uri is an image
  const type    = getBase64MimeType(photouri);
  const isImage = isMimeTypeImage(type);
  //check if uri is a valid base64image
  return(isBase64 && isImage);
};

export function addLeadingZero(number){
  return number < 10? `0${number}`: number;
};

export function formatPercent(percent){
  const isWhole = (percent % 1 === 0);
  const formatted = isWhole? percent : percent.toFixed(2);
  return(`${formatted}%`);
};

export function nextFrame() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve)
  });
};

export async function randomDelay(min, max) {
  const delay = Math.random() * (max - min) + min
  const startTime = performance.now()

  while (performance.now() - startTime < delay) {
    await nextFrame()
  };
};

export function countOccurences(item = '', items = []){
  return items.filter(i => i === item).length;
};

//returns undefined if property does not exist
export function getProperty(obj, key) {
  return key.split(".").reduce((o, x) => 
    ((typeof o == "undefined" || o === null)? o : o[x]), obj
  );
};

export function capitalize(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function lerp(a, b, n) {
  return (1 - n) * a + n * b;
};

export function createObjectFromKeys(keys = {}){
  let newObject = {};

  const propKeys = Object.keys(keys);
  propKeys.forEach(key =>  {
    newObject[key] = null;
  });

  return newObject;
};

export function stringHash(string = '') {
  let length = string?.length ?? 0;
  let hash = 0, char;

  if (length === 0) return hash;

  while (length--) {
    char = string.charCodeAt(length);
    hash = ((hash << 5) - hash) + char;
    // Convert to 32bit integer
    hash |= 0; 
  };

  return hash;
};

export function roundToTwo(num){
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

/**
 * extracts all the property keys from an object 
 * and creates an enum of property keys
 * ### Example:
 *   - `createEnumFromObject({ a: 1, b: 2 })`
 *      will return: `{ a: 'a', b: 'b'}`
 */
export function createEnumFromObject(object = {}){
  // written like this for type inference
  let acc = {};

  for(const key of Object.keys(object ?? {})) {
    acc[key] = key;
  };

  return acc;
};

/**
 * 
 * @param {NodeRequire} require 
 */
export function preloadImage(require){
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.src = require;
    img.onload = resolve;
    img.onerror = reject;

    return img;
  })
};

export function createDictFromKeys(keys, value){
  const reducer = 
    (acc = {}, curr) => ({[curr]: (value ?? ''), ...acc});

  return Object.keys(keys)
    .reduce(reducer, {});
};