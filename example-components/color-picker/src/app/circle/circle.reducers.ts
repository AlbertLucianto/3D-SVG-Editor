import { Reducer, Action } from 'redux';
import { actionTypes, SelectAction } from './circle.actions';

export const attributeReducer: Reducer<string> = (state = 'fill', action: Action): string => {
  switch (action.type) {
    case actionTypes.SELECT: return (<SelectAction>action).attribute;
  }
  return state;
};

export const circleComponentReducer: Reducer<any> = (state: any = {}, action: Action): any => {
  return {
    ...state,
    attribute: attributeReducer(state.attribute, action),
  };
};
