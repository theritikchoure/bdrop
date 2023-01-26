import * as Actions from './../actions/types';

const initialState = {
  resError: '',
  resSuccess: '',
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_RES_SUCCESS_MSG:
      return {
        ...state,
        resSuccess: action.payload,
      };
    case Actions.SET_RES_ERROR_MSG:
      return {
        ...state,
        resError: action.payload,
      };
    case Actions.CLEAR_RES_MSG:
      return initialState;
    default:
      return state;
  }
};
