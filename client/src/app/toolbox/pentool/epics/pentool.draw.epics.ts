/**
 * NEED SOME MORE REFINEMENTS!
 */
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { MiddlewareAPI } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/throttle';
import { raceStatic } from 'rxjs/operator/race';

import { AnchorActions } from '../../../canvas/anchor/anchor.action';
import { AnchorType } from '../../../canvas/anchor/anchor.model';
import { IBoard, IPosition } from '../../../canvas/canvas.model';
import { PathActions, PathActionType } from '../../../canvas/path/path.action';
import { Path } from '../../../canvas/path/path.model';
import { ColorAttribute } from '../../../color/rim/rim.model';
import { IAppState } from '../../../store/model';
import { PentoolActions, PentoolActionType } from '../pentool.action';

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
		private pentoolActions: PentoolActions,
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
			const targetIn = <Array<number>>store.getState().toolbox.selected.others.get('activePathIn').toJS();
			if (shouldAdjust) {
				const boardState = <IBoard>store.getState().canvas.board.toJS();
				position = calcPositionOnCanvas(<IPosition>action.payload, boardState); }
			return this.pathActions.addAnchorAction(targetIn, position, anchorType);
		};

		const updateAnchorPosWithStore = (store: MiddlewareAPI<IAppState>, positionKey: string, shouldAdjust: boolean) =>
		(action: FluxStandardAction<any, undefined>) => {
			let position = <IPosition>action.payload[positionKey];
			const targetIn = <Array<number>>store.getState().toolbox.selected.others.get('activePathIn').toJS();
			const idx = (<Path>store.getState().canvas.getIn(['root', ...targetIn])).children.size - 1;
			if (shouldAdjust) {
				const boardState = <IBoard>store.getState().canvas.board.toJS();
				position = calcPositionOnCanvas(<IPosition>action.payload, boardState); }
			return this.anchorActions.updatePosition(targetIn, idx, position);
		};

		let lastAnchorType: AnchorType;

		return (action$, store) => action$
			.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS)
			.throttle(() => action$
				.ofType(PathActionType.PATH_ZIP_PATH)
				.switchMap(() => action$.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS)), // Skip one right after zip
			)
			.map(action => this.pathActions.createNewIn(
				store.getState().canvas.isolate.toArray(),
				calcPositionOnCanvas(action.payload, <IBoard>store.getState().canvas.board.toJS())),
			)
			.map(action => this.pentoolActions.changeActivePathAction([...action.payload.parentIn, -1]))
			.map(action => this.pathActions.changeColor(action.payload, ColorAttribute.Fill, store.getState().color.rim.fill.color))
			.map(action => this.pathActions.changeColor(action.payload.targetIn, ColorAttribute.Outline, store.getState().color.rim.outline.color))
			.switchMap(() => // First create anchor, wait either drag or release, creating curve or line
				raceStatic<FluxStandardAction<any, undefined>>(
					action$.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS).take(1)
						.map(addAnchorWithStore(store, 'absPoint', true))
						.do(() => lastAnchorType = AnchorType.LineTo),
					action$.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS).take(1) // Take only the first and place an anchor
						.map(addAnchorWithStore(store, 'absPoint', true, AnchorType.CubicBezierCurve))
						.do(() => lastAnchorType = AnchorType.CubicBezierCurve)
						.switchMap(() => action$ // Update anchor position each move
							.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
							.map(updateAnchorPosWithStore(store, 'absPoint', true))
							.map(action => this.anchorActions.updateBezierHandle(action.payload.targetIn, action.payload.idx, action.payload.position, 'both')),
						)
						.takeUntil(action$.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS)),
				)
				.last()
				.switchMap(() => action$ // For next movements
					.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
					.throttle(() => { // Do this after the `switchMap()` below and skip that while this executing (dragging)
						let lastIdx: number;
						return action$
						.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS)
						.mergeMap(downAction => raceStatic<FluxStandardAction<any, undefined>>(
							action$.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS).take(1)
								.map(addAnchorWithStore(store, 'absPoint', true))
								.do(() => lastAnchorType = AnchorType.LineTo),
							action$.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS).take(1)
								.do(action => lastIdx = action.payload.idx)
								.map(addAnchorWithStore(store, 'absPoint', true, AnchorType.SmoothCurveTo))
								.map(action =>
									lastAnchorType === AnchorType.LineTo ?
									this.anchorActions.changeType(action.payload.targetIn, lastIdx - 1, AnchorType.SmoothCurveTo) : action)
								.switchMap(() => action$
									.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
									.map(updateAnchorPosWithStore(store, 'absPoint', true))
									.map(action => this.anchorActions.updateBezierHandle(action.payload.targetIn, action.payload.idx, action.payload.position))
									.map(action => {
										const boardState = <IBoard>store.getState().canvas.board.toJS();
										const downOnCanvas = calcPositionOnCanvas(downAction.payload, boardState);
										const position: IPosition = { // Reverse handle for the previous anchor
											x: (downOnCanvas.x * 2) - action.payload.position.x,
											y: (downOnCanvas.y * 2) - action.payload.position.y,
										};
										return this.anchorActions.updateBezierHandle(action.payload.targetIn, action.payload.idx - 1, position, 'end');
									}),
								)
								.do(() => lastAnchorType = AnchorType.SmoothCurveTo)
								.takeUntil(action$.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS)),
						).last());
					})
					.switchMap(() => { // Track movement when mouse is not down
						let anchorIdx: number;
						return action$
						.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
						.map(updateAnchorPosWithStore(store, 'absPoint', true))
						.do(action => anchorIdx = action.payload.idx)
						.filter(() =>
							lastAnchorType === AnchorType.CubicBezierCurve
							|| lastAnchorType === AnchorType.SmoothCurveTo)
						.map(action => this.anchorActions.updateBezierHandle(action.payload.targetIn, anchorIdx, action.payload.position, 'end'))
						.takeUntil(action$.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS));
					}),
				)
				.takeUntil(action$.ofType(PathActionType.PATH_ZIP_PATH)),
			)
			.mapTo(doneAction);
	}
}
