import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { IPosition } from '../../canvas/canvas.model';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum CanvastoolActionType {
	CANVASTOOL_MOUSE_DOWN_ON_CANVAS = 'CANVASTOOL_MOUSE_DOWN_ON_CANVAS',
	CANVASTOOL_MOUSE_MOVE_ON_CANVAS = 'CANVASTOOL_MOUSE_MOVE_ON_CANVAS',
	CANVASTOOL_MOUSE_UP_ON_CANVAS = 'CANVASTOOL_MOUSE_UP_ON_CANVAS',
}

export type ICanvasMoveAction = FluxStandardAction<IPosition, undefined>;

@Injectable()
export class CanvastoolActions {
	/**
	 * Note:
	 *
	 * Here it does not need any `@dispatch()` decorator as it will only be
	 * dispatched by view components, not epics. If decorated, it will redundantly
	 * dispatch twice.
	 */
	mouseDownOnCanvasAction = (startPosition: IPosition): ICanvasMoveAction => ({
		type: CanvastoolActionType.CANVASTOOL_MOUSE_DOWN_ON_CANVAS,
		payload: startPosition,
		meta: undefined,
	})

	moveCursorOnCanvasAction = (currentPosition: IPosition): ICanvasMoveAction => ({
		type: CanvastoolActionType.CANVASTOOL_MOUSE_MOVE_ON_CANVAS,
		payload: currentPosition,
		meta: undefined,
	})

	mouseUpOnCanvasAction = (endPosition: IPosition): ICanvasMoveAction => ({
		type: CanvastoolActionType.CANVASTOOL_MOUSE_UP_ON_CANVAS,
		payload: endPosition,
		meta: undefined,
	})
}
