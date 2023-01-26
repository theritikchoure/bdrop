import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from '../redux/reducers';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const middleware = [thunk];

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    {},
    composeWithDevTools(applyMiddleware(...middleware))
  );
}