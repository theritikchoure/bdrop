// import generateLoginOTPService from '../services/authService';
import * as Actions from './types';

/**
 * @desc Set Auth Loader
 */
export const setAuthLoader = (payload) => {
  return {
    type: Actions.SET_AUTH_LOADER,
    payload,
  };
};

/**
 * @desc Set Current User
 */
 export const setCurrentUser = (payload) => {
  return {
    type: Actions.SET_CURRENT_USER,
    payload,
  };
};

/**
 * @desc Clear Auth Data
 */
export const clearAuthData = () => {
  return {
    type: Actions.CLEAR_AUTH_DATA,
  };
};