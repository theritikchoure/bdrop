import * as Actions from './types';

/**
 * @desc Set success message
 */
export const setSuccessMessage = (payload) => {
  return {
    type: Actions.SET_RES_SUCCESS_MSG,
    payload: payload,
  };
};

/**
 * @desc Set Error message
 */
export const setErrorMessage = (payload) => {
  return {
    type: Actions.SET_RES_ERROR_MSG,
    payload: payload,
  };
};

/**
 * @desc Clear Response message
 */
export const clearResponseMessage = () => {
  return {
    type: Actions.CLEAR_RES_MSG,
  };
};
