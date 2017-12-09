import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/Observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store/model';
import { CanvasActions, CanvasActionType } from './canvas.action';
import { IPosition } from './canvas.model';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

@Injectable()
export class CanvasEpics {
	constructor(private canvasActions: CanvasActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.updateTopLeftAfterMoved()),
			createEpicMiddleware(this.undoStateOnKeyPairPressed()),
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
		return (action$, store) => Observable.fromEvent<KeyboardEvent>(document, 'keydown')
			.throttle(() => Observable.fromEvent(document, 'keyup'))
			.filter((e: KeyboardEvent) => {
				const key = e.which || e.keyCode;
				return key === 17 // Windows Ctrl key
				|| key === 91 || key === 93; // Cmd key
			})
			.switchMap(() => Observable.fromEvent<KeyboardEvent>(document, 'keydown')
				.filter((e: KeyboardEvent) => {
					const key = e.which || e.keyCode;
					return key === 90; // Z key
				})
				.map(() => this.canvasActions.popHistory()),
			)
			.mapTo(doneAction);
	}
}
