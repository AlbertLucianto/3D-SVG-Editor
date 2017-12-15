import { List } from 'immutable';
import { Action, Reducer } from 'redux';

import { AnchorActionType } from './anchor/anchor.action';
import { anchorReducer } from './anchor/anchor.reducer';
import {
	CanvasActionType,
	IUpdateMovedAction,
	IUpdateScaleAction,
	IUpdateTopLeftAction,
} from './canvas.action';
import * as canvasCore from './canvas.core';
import { Board, CanvasState } from './canvas.model';
import { DrawableActionType } from './drawable/drawable.action';
import { drawableReducer } from './drawable/drawable.reducer';
import { PathActionType } from './path/path.action';
import { pathReducer } from './path/path.reducer';

export const canvasReducer: Reducer<CanvasState> = (
	state = new CanvasState({
		root: List([]),
		board: new Board(),
		selected: List<List<number>>([]),
		isolate: List<number>([]),
	}),
	action: Action) => {
		switch (true) {
			case action.type in DrawableActionType:
				return drawableReducer(state, action);
			case action.type in PathActionType:
				return pathReducer(state, action);
			case action.type in AnchorActionType:
				return anchorReducer(state, action);
		}
		switch (action.type) {
			case CanvasActionType.CANVAS_UPDATE_TOP_LEFT:
				return canvasCore.updateTopLeft(state, (<IUpdateTopLeftAction>action).payload);
			case CanvasActionType.CANVAS_UPDATE_SCALE:
				return canvasCore.updateScale(state, (<IUpdateScaleAction>action).payload);
			case CanvasActionType.CANVAS_UPDATE_MOVED:
				return canvasCore.updateMoved(state, (<IUpdateMovedAction>action).payload);
			case CanvasActionType.CANVAS_PUSH_HISTORY:
				return canvasCore.pushHistory(state);
			case CanvasActionType.CANVAS_UNDO:
				return canvasCore.undo(state);
			case CanvasActionType.CANVAS_REDO:
				return canvasCore.redo(state);
		}
		return state;
};
