import { Reducer, Action } from 'redux';
import { IFill, IOutline } from '../rim/rim.model';

export const sliderReducer: Reducer<IFill|IOutline> = (state: IFill|IOutline, action: Action): IFill|IOutline => {
  return state;
};
