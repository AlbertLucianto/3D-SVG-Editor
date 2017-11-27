import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IPosition } from '../../canvas/canvas.model';
import { AnchorType } from './anchor.model';

export enum AnchorActionType {
	ANCHOR_UPDATE_POSITION = 'ANCHOR_UPDATE_POSITION',
	ANCHOR_CHANGE_TYPE = 'ANCHOR_CHANGE_TYPE',
	ANCHOR_UPDATE_BEZIER_HANDLE = 'ANCHOR_UPDATE_BEZIER_HANDLE',
}

export interface IUpdatePositionPayload {
	targetIn: Array<number>;
	idx: number;
	position: IPosition;
}
export interface IChangeTypePayload {
	targetIn: Array<number>;
	idx: number;
	anchorType: AnchorType;
}
export interface IUpdateBezierHandlePayload {
	targetIn: Array<number>;
	idx: number;
	position: IPosition;
}

export type IUpdatePositionAction = FluxStandardAction<IUpdatePositionPayload, undefined>;
export type IChangeTypeAction = FluxStandardAction<IChangeTypePayload, undefined>;
export type IUpdateBezierHandleAction = FluxStandardAction<IUpdateBezierHandlePayload, undefined>;

@Injectable()
export class AnchorActions {
	/**
	 * Note:
	 *
	 * Don't forget to add `@dispatch()` if you want to achieve continuous dispatch.
	 * Otherwise, it will be just passing to the next operator, and only the last action is dispatched
	 */
	@dispatch()
	updatePosition = (targetIn: Array<number>, idx: number, position: IPosition): IUpdatePositionAction => {
		return {
			type: AnchorActionType.ANCHOR_UPDATE_POSITION,
			payload: { targetIn, idx, position },
			meta: undefined,
		};
	}

	@dispatch()
	changeType = (targetIn: Array<number>, idx: number, anchorType: AnchorType): IChangeTypeAction => {
		return {
			type: AnchorActionType.ANCHOR_CHANGE_TYPE,
			payload: { targetIn, idx, anchorType },
			meta: undefined,
		};
	}

	@dispatch()
	updateBezierHandle = (targetIn: Array<number>, idx: number, position: IPosition): IUpdateBezierHandleAction => {
		return {
			type: AnchorActionType.ANCHOR_UPDATE_BEZIER_HANDLE,
			payload: { targetIn, idx, position },
			meta: undefined,
		};
	}
}
