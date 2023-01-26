import * as Actions from '../actions/types';

const initialState = {
  user: undefined,
  loading: false,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_AUTH_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case Actions.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case Actions.CLEAR_AUTH_DATA:
      return initialState;
    default:
      return state;
  }
};
