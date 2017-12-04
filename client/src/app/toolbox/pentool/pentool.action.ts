import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IPosition } from '../../canvas/canvas.model';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum PentoolActionType {
	PENTOOL_MOUSE_DOWN_ON_CANVAS = 'PENTOOL_MOUSE_DOWN_ON_CANVAS',
	PENTOOL_MOUSE_UP_ON_CANVAS = 'PENTOOL_MOUSE_UP_ON_CANVAS',
	PENTOOL_MOUSE_MOVE_ON_CANVAS = 'PENTOOL_MOUSE_MOVE_ON_CANVAS',
	PENTOOL_MOUSE_DOWN_ON_ANCHOR = 'PENTOOL_MOUSE_DOWN_ON_ANCHOR',
}

export type IMouseDownOnCanvasPayload = IPosition;
export type IMouseUpOnCanvasPayload = IMouseDownOnCanvasPayload;
export type IMoveCursorPayload = IMouseDownOnCanvasPayload;
export interface IMouseDownOnAnchorPayload { targetIn: Array<number>; idx: number; }

export type IMouseDownOnCanvasAction = FluxStandardAction<IMouseDownOnCanvasPayload, undefined>;
export type IMouseUpOnCanvasAction = FluxStandardAction<IMouseUpOnCanvasPayload, undefined>;
export type IMoveCursorOnCanvasAction = FluxStandardAction<IMoveCursorPayload, undefined>;
export type IMouseDownOnAnchorAction = FluxStandardAction<IMouseDownOnAnchorPayload, undefined>;

@Injectable()
export class PentoolActions {
	/**
	 * Note:
	 *
	 * Here it does not need any `@dispatch()` decorator as it will only be
	 * dispatched by view components, not epics. If decorated, it will redundantly
	 * dispatch twice.
	 */
	mouseDownOnCanvasAction = (absPoint: IPosition): IMouseDownOnCanvasAction => ({
		type: PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS,
		payload: absPoint,
		meta: undefined,
	})

	mouseUpOnCanvasAction = (absPoint: IPosition): IMouseUpOnCanvasAction => ({
		type: PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS,
		payload: absPoint,
		meta: undefined,
	})

	moveCursorOnCanvasAction = (absPoint: IPosition): IMoveCursorOnCanvasAction => ({
		type: PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS,
		payload: absPoint,
		meta: undefined,
	})

	mouseDownOnAnchorAction = (targetIn: Array<number>, idx: number): IMouseDownOnAnchorAction => ({
		type: PentoolActionType.PENTOOL_MOUSE_DOWN_ON_ANCHOR,
		payload: { targetIn, idx },
		meta: undefined,
	})
}
