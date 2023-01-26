import * as Actions from '../actions/types';

const initialState = {
  loading: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case Actions.CLEAR_LOADER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
