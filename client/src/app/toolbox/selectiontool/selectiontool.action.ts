import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum SelectiontoolActionType {
	SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE = 'SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE',
	SELECTIONTOOL_MOUSE_DOWN_ON_CANVAS = 'SELECTIONTOOL_MOUSE_DOWN_ON_CANVAS',
	SELECTIONTOOL_KEY_DOWN_ON_WINDOW = 'SELECTIONTOOL_KEY_DOWN_ON_WINDOW',
}

export type IMouseDownOnDrawableAction = FluxStandardAction<Array<number>, undefined>;
export type IKeyDownOnWindowAction = FluxStandardAction<KeyboardEvent, undefined>;

@Injectable()
export class SelectiontoolActions {
	/**
	 * Note:
	 *
	 * Here it does not need any `@dispatch()` decorator as it will only be
	 * dispatched by view components, not epics
	 */
	mouseDownOnDrawableAction = (targetIn: Array<number>): IMouseDownOnDrawableAction => ({
		type: SelectiontoolActionType.SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE,
		payload: targetIn,
		meta: undefined,
	})

	mouseDownOnCanvas = (): Action => ({
		type: SelectiontoolActionType.SELECTIONTOOL_MOUSE_DOWN_ON_CANVAS,
	})

	keyDownOnWindow = (e: KeyboardEvent): IKeyDownOnWindowAction => ({
		type: SelectiontoolActionType.SELECTIONTOOL_KEY_DOWN_ON_WINDOW,
		payload: e,
		meta: undefined,
	})
}
