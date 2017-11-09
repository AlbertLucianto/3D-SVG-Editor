import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';

import { rimComponentReducer } from '../rim/rim.reducers';
import { IRim } from '../rim/rim.model';

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    rim: rimComponentReducer,
  }),
);
