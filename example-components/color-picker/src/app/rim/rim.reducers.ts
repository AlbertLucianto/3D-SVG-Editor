import { Reducer, Action } from 'redux';
import {
  actionTypes,
  SelectAttributeAction,
  ChangeFillColor,
  ChangeOutlineColor,
  ChangeOutlineWidth,
} from './rim.actions';
import { IRim, InitRim, Fill, IFill, Outline, IOutline, ColorRGB } from './rim.model';

export const attributeReducer: Reducer<string> = (state, action: Action): string => {
  switch (action.type) {
    case actionTypes.SELECT_ATTRIBUTE: return (<SelectAttributeAction>action).attribute;
  }
  return state;
};

export const fillReducer: Reducer<IFill> = (state: IFill, action: Action): IFill => {
  switch (action.type) {
    case actionTypes.CHANGE_FILL_COLOR:
      return <IFill>{
        ...state,
        color: (<ChangeFillColor>action).color,
      };
  }
  return state;
};

export const outlineReducer: Reducer<IOutline> = (state: IOutline, action: Action): IOutline => {
  switch (action.type) {
    case actionTypes.CHANGE_OUTLINE_COLOR:
      return <IOutline>{
        ...state,
        color: (<ChangeOutlineColor>action).color,
      };
    case actionTypes.CHANGE_OUTLINE_WIDTH:
      return <IOutline>{
        ...state,
        width: (<ChangeOutlineWidth>action).width,
      };
  }
  return state;
};

export const rimComponentReducer: Reducer<IRim> = (state: IRim = new InitRim(
    'fill',
    new Fill('#000'),
    new Outline(new ColorRGB(255, 255, 255), 0),
  ), action: Action): any => {
  return <IRim>{
    ...state,
    activeAttribute: attributeReducer(state.activeAttribute, action),
    fill: fillReducer(state.fill, action),
    outline: outlineReducer(state.outline, action),
  };
};
