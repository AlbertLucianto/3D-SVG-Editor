import { Action, Reducer } from 'redux';

import { CanvasState } from '../canvas.model';
import {
	DrawableActionType,
	IAddSelectAction,
	IDeleteDrawableAction,
	IDeselectAction,
	IRefreshAllRoutePathInAction,
	ISelectAction,
	IUpdatePositionAction,
} from './drawable.action';
import * as drawableCore from './drawable.core';

export const drawableReducer: Reducer<CanvasState> = (state: CanvasState, action: Action) => {
	switch (action.type) {
		case DrawableActionType.DRAWABLE_SELECT:
			const selectAction = <ISelectAction>action;
			return <CanvasState>drawableCore.selectDrawable(state, selectAction.payload);
		case DrawableActionType.DRAWABLE_ADD_SELECT:
			const addSelectAction = <IAddSelectAction>action;
			return <CanvasState>drawableCore.addSelectDrawable(state, addSelectAction.payload);
		case DrawableActionType.DRAWABLE_DESELECT:
			const deselectAction = <IDeselectAction>action;
			return <CanvasState>drawableCore.deselectDrawable(state, deselectAction.payload);
		case DrawableActionType.DRAWABLE_DESELECT_ALL:
			return <CanvasState>drawableCore.deselectAllDrawable(state);
		case DrawableActionType.DRAWABLE_DELETE:
			const deleteAction = <IDeleteDrawableAction>action;
			return <CanvasState>drawableCore.deleteDrawable(state, deleteAction.payload);
		case DrawableActionType.DRAWABLE_REFRESH_ALL_ROUTE_PATH_IN:
			const refreshAction = <IRefreshAllRoutePathInAction>action;
			return <CanvasState>drawableCore.refreshAllRoutePathIn(state, refreshAction.payload);
		case DrawableActionType.DRAWABLE_UPDATE_POSITION:
			const updatePositionAction = <IUpdatePositionAction>action;
			return <CanvasState>drawableCore.updatePosition(
				state,
				updatePositionAction.payload.targetIn,
				updatePositionAction.payload.projection);
	}
	return state;
};
