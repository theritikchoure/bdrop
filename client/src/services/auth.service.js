import jwt_decode from 'jwt-decode';
import { setAuthLoader, setCurrentUser, clearAuthData } from './../redux/actions/authActions';
import { clearHomeData } from './../redux/actions/homeActions';
import { clearResponseMessage } from './../redux/actions/messageActions';
import { postRequestMethod } from '../global/api.manager';
import { clearToken, saveToken } from '../helper/authTokenHelpers';
import { deleteAllLocalData, saveUserDetails } from '../helper/localStorageHelpers';

const BASE_URL = process.env.REACT_APP_API_BASE_URL+'/auth';
/**
 * @desc Generate OTP for Login
 * @param {*} obj Data Obj
 */
export const generateOTP = (payload) => async (dispatch) => {
  try {
    dispatch(clearResponseMessage());
    dispatch(setAuthLoader(true));

    const response = await postRequestMethod(BASE_URL+'/generateotp', payload);
    console.log("authService", response);
    return response.data;
  } catch (e) {
    throw e;
  } 
};

/**
 * @desc Verify OTP for Login
 * @param {*} obj Data Obj
 */
export const verifyOTP = (payload) => async (dispatch) => {
  try {
    dispatch(clearResponseMessage());
    dispatch(setAuthLoader(true));

    const response = await postRequestMethod(BASE_URL+'/verifyotp', payload);
    console.log("authService", response);
    const { data } = response.data;

    dispatch(setLoginToken(data.token));
    return response.data;
  } catch (e) {
    throw e;
  } 
};

/**
 * @desc set login token and set user
 */
export const setLoginToken = (token) => (dispatch) => {
  // save auth deteils and set token in header for request
  saveToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
  // Set current user in localstorage and redux
  saveUserDetails(decoded);
  dispatch(setCurrentUser(decoded))
};

/**
 * @desc Log user out
 */
export const logout = () => (dispatch) => {
  /**
   * Remove token from localStorage
   * Remove auth header for future requests
   * Set current user to {} which will set isAuthenticated to false
   */
  clearToken();
  deleteAllLocalData();
  //clear reducer data
  dispatch(clearAuthData());
  dispatch(clearHomeData());
};