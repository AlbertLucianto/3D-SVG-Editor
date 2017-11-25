import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IPosition } from './canvas.model';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum CanvasActionType {
	CANVAS_UPDATE_TOP_LEFT = 'CANVAS_UPDATE_TOP_LEFT',
	CANVAS_UPDATE_SCALE = 'CANVAS_UPDATE_SCALE',
	CANVAS_UPDATE_MOVED = 'CANVAS_UPDATE_MOVED',
}

export type IUpdateTopLeftAction = FluxStandardAction<IPosition, undefined>;
export type IUpdateScaleAction = FluxStandardAction<number, undefined>;
export type IUpdateMovedAction = IUpdateTopLeftAction;

@Injectable()
export class CanvasActions {
	@dispatch()
	updateTopLeft = (position: IPosition): IUpdateTopLeftAction => ({
		type: CanvasActionType.CANVAS_UPDATE_TOP_LEFT,
		payload: position,
		meta: undefined,
	})

	@dispatch()
	updateScale = (scaleBy: number): IUpdateScaleAction => ({
		type: CanvasActionType.CANVAS_UPDATE_SCALE,
		payload: scaleBy,
		meta: undefined,
	})

	@dispatch()
	updateMoved = (position: IPosition): IUpdateMovedAction => ({
		type: CanvasActionType.CANVAS_UPDATE_MOVED,
		payload: position,
		meta: undefined,
	})
}
