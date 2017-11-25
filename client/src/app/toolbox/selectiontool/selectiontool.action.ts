import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum SelectiontoolActionType {
	SELECTIONTOOL_SELECT_DRAWABLE = 'SELECTIONTOOL_SELECT_DRAWABLE',
}

export type ISelectDrawableAction = FluxStandardAction<{
	drawable: Object,
}, undefined>;

@Injectable()
export class SelectiontoolActions {
	/**
	 * Note:
	 *
	 * Here it does not need any `@dispatch()` decorator as it will only be
	 * dispatched by view components, not epics
	 */
	selectDrawableAction = (drawable: Object): ISelectDrawableAction => ({
		type: SelectiontoolActionType.SELECTIONTOOL_SELECT_DRAWABLE,
		payload: { drawable },
		meta: undefined,
	})
}
