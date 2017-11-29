import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { MiddlewareAPI } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/throttle';
import { raceStatic } from 'rxjs/operator/race';

import { AnchorActions } from '../../../canvas/anchor/anchor.action';
import { AnchorType } from '../../../canvas/anchor/anchor.model';
import { IBoard, IPosition } from '../../../canvas/canvas.model';
import { PathActions, PathActionType } from '../../../canvas/path/path.action';
import { IAppState } from '../../../store/model';
import { PentoolActionType } from '../pentool.action';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

const calcPositionOnCanvas = (input: IPosition, boardState: IBoard): IPosition => {
	const { scale, topLeft } = boardState;
	return {
		x: (input.x - topLeft.x) / scale,
		y: (input.y - topLeft.y) / scale,
	};
};

@Injectable()
export class PentoolDrawEpics {
	constructor(
		private anchorActions: AnchorActions,
		private pathActions: PathActions) { }

		public createEpics = () => {
			return [
				createEpicMiddleware(this.addThenListenUpdateUntilAnchorPlaced()),
			];
		}

	private addThenListenUpdateUntilAnchorPlaced = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {

		const addAnchorWithStore = (store: MiddlewareAPI<IAppState>, positionKey: string, shouldAdjust: boolean, anchorType?: AnchorType) =>
		(action: FluxStandardAction<any, undefined>) => {
			let position = <IPosition>action.payload[positionKey];
			if (shouldAdjust) {
				const boardState = <IBoard>store.getState().canvas.get('board').toJS();
				position = calcPositionOnCanvas(<IPosition>action.payload[positionKey], boardState); }
			return this.pathActions.addAnchorAction(action.payload.targetIn, position);
		};

		const updateAnchorWithStore = (store: MiddlewareAPI<IAppState>, positionKey: string, shouldAdjust: boolean, anchorType?: AnchorType) =>
		(action: FluxStandardAction<any, undefined>) => {
			let position = <IPosition>action.payload[positionKey];
			if (shouldAdjust) {
				const boardState = <IBoard>store.getState().canvas.get('board').toJS();
				position = calcPositionOnCanvas(<IPosition>action.payload[positionKey], boardState); }
			return this.anchorActions.updatePosition(action.payload.targetIn, action.payload.idx, position);
		};

		return (action$, store) => action$
			.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS)
			.throttle(() => action$.ofType(PathActionType.PATH_ZIP_PATH))
			.map(addAnchorWithStore(store, 'absPoint', true))
			.switchMap(() =>
				raceStatic(
					action$.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS).take(1)
						.map(addAnchorWithStore(store, 'absPoint', true)),
					action$.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
						.do(action => console.log('drag', action))
						.takeUntil(action$.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS)),
				)
				.last()
				.do(action => console.log('last', action))
				.switchMap(() => action$
					.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
					.throttle(() => action$
						.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS)
						.do(action => console.log('down', action))
						.switchMap(() => raceStatic(
							action$.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS).take(1),
							action$.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
							.do(action => console.log('drag_smooth', action))
							.takeUntil(action$.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS)),
						).last()),
					)
					.switchMap(() => action$
					.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
						.map(updateAnchorWithStore(store, 'absPoint', true))
						.do(action => console.log('move', action))
						.takeUntil(action$.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS)),
					),
				)
				.takeUntil(action$.ofType(PathActionType.PATH_ZIP_PATH)),
			)
			.mapTo(doneAction);
	}
}
