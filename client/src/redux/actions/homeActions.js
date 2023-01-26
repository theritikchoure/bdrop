import * as Actions from './types';

/**
 * @desc Set Home Loader
 */
export const setHomeLoader = (payload) => {
  return {
    type: Actions.SET_HOME_LOADER,
    payload,
  };
};

/**
 * @desc Clear Home Data
 */
export const clearHomeData = () => {
  return {
    type: Actions.CLEAR_HOME_DATA,
  };
};
