import { Reducer, Action } from 'redux';
import { actionTypes, SelectAction } from './rim.actions';
import { IRim, InitRim, Fill, Outline, ColorRGB } from './rim.model';

export const attributeReducer: Reducer<string> = (state = 'fill', action: Action): string => {
  switch (action.type) {
    case actionTypes.SELECT: return (<SelectAction>action).attribute;
  }
  return state;
};

export const rimComponentReducer: Reducer<IRim> = (state: IRim = new InitRim(
    'fill',
    new Fill('#000'),
    new Outline(new ColorRGB(255, 255, 255), 0),
  ), action: Action): any => {
  return {
    ...state,
    activeAttribute: attributeReducer(state.activeAttribute, action),
  };
};
