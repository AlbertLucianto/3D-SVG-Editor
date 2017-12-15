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
	CANVAS_PUSH_HISTORY = 'CANVAS_PUSH_HISTORY',
	CANVAS_UNDO = 'CANVAS_UNDO',
	CANVAS_REDO = 'CANVAS_REDO',
}

export type IUpdateTopLeftAction = FluxStandardAction<IPosition, undefined>;
export type IUpdateScaleAction = FluxStandardAction<number, undefined>;
export type IUpdateMovedAction = IUpdateTopLeftAction;
export type IPushHistoryAction = FluxStandardAction<undefined, undefined>;
export type IUndoAction = IPushHistoryAction;
export type IRedoAction = IPushHistoryAction;

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

	@dispatch()
	pushHistory = (): IPushHistoryAction => ({
		type: CanvasActionType.CANVAS_PUSH_HISTORY,
		payload: undefined,
		meta: undefined,
	})

	@dispatch()
	undo = (): IUndoAction => ({
		type: CanvasActionType.CANVAS_UNDO,
		payload: undefined,
		meta: undefined,
	})

	@dispatch()
	redo = (): IRedoAction => ({
		type: CanvasActionType.CANVAS_REDO,
		payload: undefined,
		meta: undefined,
	})
}
