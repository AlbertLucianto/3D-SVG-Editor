import { Action, Reducer } from 'redux';

import { ColorPickerState } from '../color.model';
import { Color } from '../rim/rim.model';
import {
	IChangeValueByChannelAction,
	SliderActionType,
} from './slider.action';

export const sliderReducer: Reducer<ColorPickerState> = (state: ColorPickerState, action: Action) => {
	switch (action.type) {
		case SliderActionType.SLIDER_CHANGE_VALUE_BY_CHANNEL:
			const { payload } = <IChangeValueByChannelAction>action;
			return <ColorPickerState>state.updateIn(
				['rim', payload.attribute, 'color'],
				(color: Color) => color.set(payload.channel, payload.value));
	}
	return state;
};
