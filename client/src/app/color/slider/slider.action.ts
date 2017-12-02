import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { ColorAttribute } from '../rim/rim.model';

export enum SliderActionType {
	SLIDER_CHANGE_VALUE_BY_CHANNEL = 'SLIDER_CHANGE_VALUE_BY_CHANNEL',
}

export interface IChangeValueByChannelPayload {
	attribute: ColorAttribute; channel: 'r'|'g'|'b'; value: number;
}

export type IChangeValueByChannelAction = FluxStandardAction<IChangeValueByChannelPayload, undefined>;

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
}
