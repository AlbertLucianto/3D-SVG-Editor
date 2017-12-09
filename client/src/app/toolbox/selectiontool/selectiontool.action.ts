import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';

import { IPosition } from '../../canvas/canvas.model';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum SelectiontoolActionType {
	SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE = 'SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE',
	SELECTIONTOOL_MOUSE_DOWN_ON_CANVAS = 'SELECTIONTOOL_MOUSE_DOWN_ON_CANVAS',
	SELECTIONTOOL_MOUSE_MOVE_ON_CANVAS = 'SELECTIONTOOL_MOUSE_MOVE_ON_CANVAS',
	SELECTIONTOOL_MOUSE_UP_ON_WINDOW = 'SELECTIONTOOL_MOUSE_UP_ON_WINDOW',
	SELECTIONTOOL_KEY_DOWN_ON_WINDOW = 'SELECTIONTOOL_KEY_DOWN_ON_WINDOW',
}

export interface IMouseDownOnDrawablePayload { targetIn: Array<number>; cursorPosition: IPosition; }

export type IMouseDownOnDrawableAction = FluxStandardAction<IMouseDownOnDrawablePayload, undefined>;
export type IKeyDownOnWindowAction = FluxStandardAction<KeyboardEvent, undefined>;
export type IMouseMoveOnCanvasAction = FluxStandardAction<IPosition, undefined>;

@Injectable()
export class SelectiontoolActions {
	/**
	 * Note:
	 *
	 * Here it does not need any `@dispatch()` decorator as it will only be
	 * dispatched by view components, not epics
	 */
	mouseDownOnDrawableAction = (targetIn: Array<number>, cursorPosition: IPosition): IMouseDownOnDrawableAction => ({
		type: SelectiontoolActionType.SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE,
		payload: { targetIn, cursorPosition },
		meta: undefined,
	})

	mouseDownOnCanvas = (): Action => ({
		type: SelectiontoolActionType.SELECTIONTOOL_MOUSE_DOWN_ON_CANVAS,
	})

	mouseMoveOnCanvas = (cursorPosition: IPosition): IMouseMoveOnCanvasAction => ({
		type: SelectiontoolActionType.SELECTIONTOOL_MOUSE_MOVE_ON_CANVAS,
		payload: cursorPosition,
		meta: undefined,
	})

	mouseUpOnWindow = () => ({
		type: SelectiontoolActionType.SELECTIONTOOL_MOUSE_UP_ON_WINDOW,
		payload: undefined,
		meta: undefined,
	})

	keyDownOnWindow = (e: KeyboardEvent): IKeyDownOnWindowAction => ({
		type: SelectiontoolActionType.SELECTIONTOOL_KEY_DOWN_ON_WINDOW,
		payload: e,
		meta: undefined,
	})
}
