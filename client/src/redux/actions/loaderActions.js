import * as Actions from './types';

/**
 * @desc Set Loader
 */
 export const setLoader = (payload) => {
  return {
    type: Actions.SET_LOADER,
    payload,
  };
};

/**
 * @desc Clear Data
 */
export const clearLoader = (payload) => {
  return {
    type: Actions.CLEAR_LOADER,
    payload,
  };
};