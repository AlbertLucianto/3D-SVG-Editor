import { Action, Reducer } from 'redux';

import { ColorPickerState } from '../color.model';
import { Color } from '../rim/rim.model';
import {
	IChangeColorAction,
	IChangeValueByChannelAction,
	SliderActionType,
} from './slider.action';

export const sliderReducer: Reducer<ColorPickerState> = (state: ColorPickerState, action: Action) => {
	switch (action.type) {
		case SliderActionType.SLIDER_CHANGE_VALUE_BY_CHANNEL:
			const changeByChannel = <IChangeValueByChannelAction>action;
			return <ColorPickerState>state.updateIn(
				['rim', changeByChannel.payload.attribute, 'color'],
				(color: Color) => color.set(changeByChannel.payload.channel, changeByChannel.payload.value));
		case SliderActionType.SLIDER_CHANGE_COLOR:
			const changeColor = <IChangeColorAction>action;
			return <ColorPickerState>state.setIn(
				['rim', changeColor.payload.attribute, 'color'], changeColor.payload.color);
	}
	return state;
};
