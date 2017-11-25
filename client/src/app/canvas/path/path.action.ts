import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { IPosition } from '../canvas.model';
// import { Path } from './path.model';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum PathActionType {
	PATH_ADD_ANCHOR = 'PATH_ADD_ANCHOR',
	PATH_UPDATE_ANCHOR = 'PATH_UPDATE_ANCHOR',
	PATH_REMOVE_ANCHOR = 'PATH_REMOVE_ANCHOR',
	PATH_REMOVE_LAST_ANCHOR = 'PATH_REMOVE_LAST_ANCHOR',
	PATH_ZIP_PATH = 'PATH_ZIP_PATH',
}

export interface IAddAnchorPayload {
	targetIn: Array<number>;
	anchorPosition: IPosition;
}
export interface IUpdateAnchorPayload extends IAddAnchorPayload {
	idx: number;
}
export interface IRemoveAnchorPayload {
	targetIn: Array<number>;
	idx: number;
}

export type IAddAnchorAction = FluxStandardAction<IAddAnchorPayload, undefined>;
export type IUpdateAnchorAction = FluxStandardAction<IUpdateAnchorPayload, undefined>;
export type IRemoveAnchorAction = FluxStandardAction<IRemoveAnchorPayload, undefined>;
export type IRemoveLastAnchorAction = FluxStandardAction<Array<number>, undefined>;
export type IZipPathAction = FluxStandardAction<Array<number>, undefined>;

@Injectable()
export class PathActions {
	/**
	 * Note:
	 *
	 * Don't forget to add `@dispatch()` if you want to achieve continuous dispatch.
	 * Otherwise, it will be just passing to the next operator, and only the last action is dispatched
	 */
	@dispatch()
	addAnchorAction = (targetIn: Array<number>, anchorPosition: IPosition): IAddAnchorAction => {
		return {
			type: PathActionType.PATH_ADD_ANCHOR,
			payload: { targetIn, anchorPosition },
			meta: undefined,
		};
	}

	@dispatch()
	updateAnchorAction = (targetIn: Array<number>, idx: number, anchorPosition: IPosition): IUpdateAnchorAction => {
		return {
			type: PathActionType.PATH_UPDATE_ANCHOR,
			payload: { targetIn, idx, anchorPosition },
			meta: undefined,
		};
	}

	@dispatch()
	removeAnchorAction = (targetIn: number[], idx: number): IRemoveAnchorAction => {
		return {
			type: PathActionType.PATH_REMOVE_ANCHOR,
			payload: { targetIn, idx },
			meta: undefined,
		};
	}

	@dispatch()
	removeLastAnchorAction = (targetIn: number[]): IRemoveLastAnchorAction => {
		return {
			type: PathActionType.PATH_REMOVE_LAST_ANCHOR,
			payload: targetIn,
			meta: undefined,
		};
	}

	@dispatch()
	zipPathAction = (targetIn: Array<number>) => {
		return {
			type: PathActionType.PATH_ZIP_PATH,
			payload: targetIn,
			meta: undefined,
		};
	}
}
