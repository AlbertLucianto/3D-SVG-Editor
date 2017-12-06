import { Action, Reducer } from 'redux';

import { CanvasState } from '../canvas.model';
import {
	IAddAnchorAction,
	IChangeColorAction,
	ICreateNewInAction,
	IRemoveAnchorAction,
	IRemoveLastAnchorAction,
	IZipPathAction,
	PathActionType,
} from './path.action';
import * as pathCore from './path.core';

export const pathReducer: Reducer<CanvasState> = (state: CanvasState, action: Action) => {
	switch (action.type) {
		case PathActionType.PATH_CREATE_NEW_IN:
			const createAction = <ICreateNewInAction>action;
			return <CanvasState>pathCore.createNewIn(state, createAction.payload.parentIn, createAction.payload.anchorPosition);
		case PathActionType.PATH_ADD_ANCHOR:
			const addAction = <IAddAnchorAction>action;
			return <CanvasState>pathCore.addAnchor(
				state, addAction.payload.targetIn, addAction.payload.anchorPosition, addAction.payload.anchorType);
		case PathActionType.PATH_REMOVE_ANCHOR:
			const removeAction = <IRemoveAnchorAction>action;
			return <CanvasState>pathCore.removeAnchor(state, removeAction.payload.targetIn, removeAction.payload.idx);
		case PathActionType.PATH_REMOVE_LAST_ANCHOR:
			const removeLastAction = <IRemoveLastAnchorAction>action;
			return <CanvasState>pathCore.removeLastAnhcor(state, removeLastAction.payload);
		case PathActionType.PATH_ZIP_PATH:
			const zipAction = <IZipPathAction>action;
			return <CanvasState>pathCore.zipPath(state, zipAction.payload);
		case PathActionType.PATH_CHANGE_COLOR:
			const changeColorAction = <IChangeColorAction>action;
			return <CanvasState>pathCore.changeColor(
				state,
				changeColorAction.payload.targetIn,
				changeColorAction.payload.attribute,
				changeColorAction.payload.color);
	}
	return state;
};
