import { Record } from 'immutable';

import { ColorAttribute, RimState } from './rim/rim.model';

export interface IColorPickerState {
	selected: ColorAttribute;
	rim: RimState;
}

const initColorPickerState = { selected: ColorAttribute.Fill, rim: new RimState() };

export class ColorPickerState extends Record(initColorPickerState) {
	selected: ColorAttribute;
	rim: RimState;

	constructor(state: IColorPickerState = initColorPickerState) {
		super(state);
	}
}
