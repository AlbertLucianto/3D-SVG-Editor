import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';

import { IAppState } from '../store/model';
import { CanvasActions, CanvasActionType } from './canvas.action';
import { IPosition } from './canvas.model';
import { KeyboardShortcut } from './utils/keyboard/keyboard.model';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

@Injectable()
export class CanvasEpics {
	constructor(private canvasActions: CanvasActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.updateTopLeftAfterMoved()),
			createEpicMiddleware(this.undoStateOnKeyPairPressed()),
			createEpicMiddleware(this.redoStateOnKeyPairPressed()),
		];
	}

	private updateTopLeftAfterMoved = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		let lastMoved = { x: 0, y: 0 };
		return (action$, store) => action$ // Maybe can use `reduce` instead
			.ofType(CanvasActionType.CANVAS_UPDATE_MOVED)
			.map(action => {
				const topLeft = <IPosition>store.getState().canvas.getIn(['board', 'topLeft']);
				const newPosition = {
					x: topLeft.x + (action.payload.x - lastMoved.x),
					y: topLeft.y + (action.payload.y - lastMoved.y),
				};
				lastMoved = action.payload;
				return this.canvasActions.updateTopLeft(newPosition);
			})
			.mapTo(doneAction);
	}

	private undoStateOnKeyPairPressed = (): Epic<KeyboardEvent|FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => KeyboardShortcut.create('cmd left+z')
			.map(() => this.canvasActions.undo())
			.mapTo(doneAction);
	}

	private redoStateOnKeyPairPressed = (): Epic<KeyboardEvent|FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => KeyboardShortcut.create('cmd left+shift+z')
			.map(() => this.canvasActions.redo())
			.mapTo(doneAction);
	}
}
