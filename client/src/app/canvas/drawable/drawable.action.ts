import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IPosition } from '../canvas.model';

export enum DrawableActionType {
	DRAWABLE_SELECT = 'DRAWABLE_SELECT',
	DRAWABLE_ADD_SELECT = 'DRAWABLE_ADD_SELECT',
	DRAWABLE_DESELECT = 'DRAWABLE_DESELECT',
	DRAWABLE_DESELECT_ALL = 'DRAWABLE_DESELECT_ALL',
	DRAWABLE_DELETE = 'DRAWABLE_DELETE',
	DRAWABLE_REFRESH_ALL_ROUTE_PATH_IN = 'DRAWABLE_REFRESH_ALL_ROUTE_PATH_IN',
	DRAWABLE_UPDATE_POSITION = 'DRAWABLE_UPDATE_POSITION',
}

export type ISelectPayload = Array<number>;
export type IAddSelectPayload = ISelectPayload;
export type IDeselectPayload = ISelectPayload;
export type IDeleteDrawablePayload = ISelectPayload;
export type IRefreshAllRoutePathInPayload = ISelectPayload;
export interface IUpdatePositionPayload { targetIn: Array<number>; projection: (pos: IPosition) => IPosition; }

export type ISelectAction = FluxStandardAction<ISelectPayload, undefined>;
export type IAddSelectAction = FluxStandardAction<IAddSelectPayload, undefined>;
export type IDeselectAction = FluxStandardAction<IDeselectPayload, undefined>;
export type IDeselectAllAction = FluxStandardAction<undefined, undefined>;
export type IDeleteDrawableAction = FluxStandardAction<IDeleteDrawablePayload, undefined>;
export type IRefreshAllRoutePathInAction = FluxStandardAction<IRefreshAllRoutePathInPayload, undefined>;
export type IUpdatePositionAction = FluxStandardAction<IUpdatePositionPayload, undefined>;

@Injectable()
export class DrawableActions {
	@dispatch()
	selectAction = (targetIn: Array<number>): ISelectAction => ({
		type: DrawableActionType.DRAWABLE_SELECT,
		payload: targetIn,
		meta: undefined,
	})

	@dispatch()
	addSelectAction = (targetIn: Array<number>): IAddSelectAction => ({
		type: DrawableActionType.DRAWABLE_ADD_SELECT,
		payload: targetIn,
		meta: undefined,
	})

	@dispatch()
	deselectAction = (targetIn: Array<number>): IDeselectAction => ({
		type: DrawableActionType.DRAWABLE_DESELECT,
		payload: targetIn,
		meta: undefined,
	})

	@dispatch()
	deselectAllAction = (): IDeselectAllAction => ({
		type: DrawableActionType.DRAWABLE_DESELECT_ALL,
		payload: undefined,
		meta: undefined,
	})

	@dispatch()
	deleteDrawableAction = (targetIn: Array<number>): IDeleteDrawableAction => ({
		type: DrawableActionType.DRAWABLE_DELETE,
		payload: targetIn,
		meta: undefined,
	})

	@dispatch()
	refreshAllRoutePathIn = (parentIn: Array<number>): IRefreshAllRoutePathInAction => ({
		type: DrawableActionType.DRAWABLE_REFRESH_ALL_ROUTE_PATH_IN,
		payload: parentIn,
		meta: undefined,
	})

	@dispatch()
	updatePosition = (targetIn: Array<number>, projection: (pos: IPosition) => IPosition): IUpdatePositionAction => ({
		type: DrawableActionType.DRAWABLE_UPDATE_POSITION,
		payload: { targetIn, projection },
		meta: undefined,
	})
}
