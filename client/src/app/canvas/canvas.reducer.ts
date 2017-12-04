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
import { Board, CanvasState, Position } from './canvas.model';
import { PathActionType } from './path/path.action';
import { Path } from './path/path.model';
import { pathReducer } from './path/path.reducer';

export const canvasReducer: Reducer<CanvasState> = (
	state = new CanvasState({
		root: List([
			new Path({ absPosition: new Position({ x: 100, y: 100 }), idx: 0 }),
			// new Group({ absPosition: { x: 100, y: 100 }, idx: 0 }),
		]),
		board: new Board(),
		selected: List<List<number>>([List([0])]),
		isolate: List<number>([]),
	}),
	action: Action) => {
		switch (true) {
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
		}
		return state;
};
