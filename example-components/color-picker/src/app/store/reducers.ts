import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';

import { circleComponentReducer } from '../circle/circle.reducers';

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    circle: circleComponentReducer,
  }),
);
