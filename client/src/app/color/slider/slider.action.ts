import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IRGBObject } from '../rim/rim.color.model';
import { Color, ColorAttribute } from '../rim/rim.model';

export enum SliderActionType {
	SLIDER_CHANGE_VALUE_BY_CHANNEL = 'SLIDER_CHANGE_VALUE_BY_CHANNEL',
	SLIDER_CHANGE_COLOR = 'SLIDER_CHANGE_COLOR',
}

export interface IChangeValueByChannelPayload { attribute: ColorAttribute; channel: 'r'|'g'|'b'; value: number; }
export interface IChangeColorPayload { attribute: ColorAttribute; color: Color; }

export type IChangeValueByChannelAction = FluxStandardAction<IChangeValueByChannelPayload, undefined>;
export type IChangeColorAction = FluxStandardAction<IChangeColorPayload, undefined>;

@Injectable()
export class SliderActions {
	/**
	 * Note:
	 *
	 * Here it does not need any `@dispatch()` decorator as it will only be
	 * dispatched by view components, not epics. If decorated, it will redundantly
	 * dispatch twice.
	 */
	changeValueByChannel = (attribute: ColorAttribute, channel: 'r'|'g'|'b', value: number): IChangeValueByChannelAction => ({
		type: SliderActionType.SLIDER_CHANGE_VALUE_BY_CHANNEL,
		payload: { attribute, channel, value },
		meta: undefined,
	})

	changeColor = (attribute: ColorAttribute, value: Color|string|IRGBObject): IChangeColorAction => {
		let color = <Color>value;
		if (!(color instanceof Color)) { color = new Color(value); }
		return {
			type: SliderActionType.SLIDER_CHANGE_COLOR,
			payload: { attribute, color },
			meta: undefined,
		};
	}
}
