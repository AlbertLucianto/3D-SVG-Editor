import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';

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
		];
	}

	private updateTopLeftAfterMoved = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		let lastMoved = { x: 0, y: 0 };
		return (action$, store) => action$
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
}
