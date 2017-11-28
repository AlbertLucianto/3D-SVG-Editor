import { Action, Reducer } from 'redux';

import { CanvasState } from '../canvas.model';
import {
	AnchorActionType,
	IChangeTypeAction,
	IUpdateBezierHandleAction,
	IUpdatePositionAction,
} from './anchor.action';
import * as anchorCore from './anchor.core';

export const anchorReducer: Reducer<CanvasState> = (state: CanvasState, action: Action) => {
	switch (action.type) {
		case AnchorActionType.ANCHOR_UPDATE_POSITION:
			const updatePositionAction = <IUpdatePositionAction>action;
			return <CanvasState>anchorCore.updatePosition(
				state,
				updatePositionAction.payload.targetIn,
				updatePositionAction.payload.idx,
				updatePositionAction.payload.position,
			);
		case AnchorActionType.ANCHOR_CHANGE_TYPE:
			const changeTypeAction = <IChangeTypeAction>action;
			return <CanvasState>anchorCore.changeType(
				state,
				changeTypeAction.payload.targetIn,
				changeTypeAction.payload.idx,
				changeTypeAction.payload.anchorType,
			);
		case AnchorActionType.ANCHOR_UPDATE_BEZIER_HANDLE:
			const updateBezierAction = <IUpdateBezierHandleAction>action;
			return <CanvasState>anchorCore.updateBezierHandle(
				state,
				updateBezierAction.payload.targetIn,
				updateBezierAction.payload.idx,
				updateBezierAction.payload.position,
				updateBezierAction.payload.which, // Should be ignored if Quadratic Bezier
			);
	}
	return state;
};
