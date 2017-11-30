import { Action, Reducer } from 'redux';

import { ColorPickerState } from './color.model';
import { OpacityActionType } from './opacity/opacity.action';
import { opacityReducer } from './opacity/opacity.reducer';
import { RimActionType } from './rim/rim.action';
import { rimReducer } from './rim/rim.reducer';
import { SliderActionType } from './slider/slider.action';
import { sliderReducer } from './slider/slider.reducer';
import { StrokeActionType } from './stroke/stroke.action';
import { strokeReducer } from './stroke/stroke.reducer';

export const colorPickerReducer: Reducer<ColorPickerState> = (
	state: ColorPickerState = new ColorPickerState(), action: Action,
) => {
	switch (true) {
		case action.type in OpacityActionType:
			return opacityReducer(state, action);
		case action.type in RimActionType:
			return rimReducer(state, action);
		case action.type in SliderActionType:
			return sliderReducer(state, action);
		case action.type in StrokeActionType:
			return strokeReducer(state, action);
	}
	return state;
};
