import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { ColorAttribute } from './rim.model';

export enum RimActionType {
	RIM_COLOR_ATTRIBUTE_SELECT = 'RIM_COLOR_ATTRIBUTE_SELECT',
}

export type IColorAttributeSelectAction = FluxStandardAction<ColorAttribute, undefined>;

@Injectable()
export class RimActions {

	ColorAttributeSelect = (attribute: ColorAttribute): IColorAttributeSelectAction => ({
		type: RimActionType.RIM_COLOR_ATTRIBUTE_SELECT,
		payload: attribute,
		meta: undefined,
	})
}
