import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';

import { rimComponentReducer } from '../rim/rim.reducers';

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    rim: rimComponentReducer,
  }),
);
