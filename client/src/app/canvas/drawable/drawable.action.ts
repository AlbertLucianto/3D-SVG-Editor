import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

export enum DrawableActionType {
	DRAWABLE_SELECT = 'DRAWABLE_SELECT',
	DRAWABLE_ADD_SELECT = 'DRAWABLE_ADD_SELECT',
	DRAWABLE_DESELECT = 'DRAWABLE_DESELECT',
	DRAWABLE_DESELECT_ALL = 'DRAWABLE_DESELECT_ALL',
	DRAWABLE_DELETE = 'DRAWABLE_DELETE',
}

export type ISelectPayload = Array<number>;
export type IAddSelectPayload = ISelectPayload;
export type IDeselectPayload = ISelectPayload;
export type IDeleteDrawablePayload = ISelectPayload;

export type SelectAction = FluxStandardAction<ISelectPayload, undefined>;
export type AddSelectAction = FluxStandardAction<IAddSelectPayload, undefined>;
export type DeselectAction = FluxStandardAction<IDeselectPayload, undefined>;
export type DeselectAllAction = FluxStandardAction<undefined, undefined>;
export type DeleteDrawableAction = FluxStandardAction<IDeleteDrawablePayload, undefined>;

@Injectable()
export class DrawableActions {
	@dispatch()
	selectAction = (targetIn: Array<number>): SelectAction => ({
		type: DrawableActionType.DRAWABLE_SELECT,
		payload: targetIn,
		meta: undefined,
	})

	@dispatch()
	addSelectAction = (targetIn: Array<number>): AddSelectAction => ({
		type: DrawableActionType.DRAWABLE_ADD_SELECT,
		payload: targetIn,
		meta: undefined,
	})

	@dispatch()
	deselectAction = (targetIn: Array<number>): DeselectAction => ({
		type: DrawableActionType.DRAWABLE_DESELECT,
		payload: targetIn,
		meta: undefined,
	})

	@dispatch()
	deselectAllAction = (): DeselectAllAction => ({
		type: DrawableActionType.DRAWABLE_DESELECT_ALL,
		payload: undefined,
		meta: undefined,
	})

	@dispatch()
	deleteDrawableAction = (targetIn: Array<number>): DeleteDrawableAction => ({
		type: DrawableActionType.DRAWABLE_DELETE,
		payload: targetIn,
		meta: undefined,
	})
}
