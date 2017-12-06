import { Action, Reducer } from 'redux';

import { ColorPickerState } from '../color.model';
import { IColorAttributeSelectAction, RimActionType } from './rim.action';

export const rimReducer: Reducer<ColorPickerState> = (state: ColorPickerState, action: Action) => {
	switch (action.type) {
		case RimActionType.RIM_COLOR_ATTRIBUTE_SELECT:
			const selectAction = <IColorAttributeSelectAction>action;
			return <ColorPickerState>state.set('selected', selectAction.payload);
	}
	return state;
};
