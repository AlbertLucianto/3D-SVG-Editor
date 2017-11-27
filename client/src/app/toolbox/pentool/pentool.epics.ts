import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import { raceStatic } from 'rxjs/operator/race';
import { Subject } from 'rxjs/Subject';

import { AnchorActions } from '../../canvas/anchor/anchor.action';
import { AnchorType } from '../../canvas/anchor/anchor.model';
import { IBoard, IPosition } from '../../canvas/canvas.model';
import { PathActions, PathActionType } from '../../canvas/path/path.action';
import { IAppState } from '../../store/model';
import { IToolboxGeneralAction, ToolboxActions, ToolboxActionType } from '../toolbox.action';
import { ToolName } from '../toolbox.model';
import { PentoolActionType } from './pentool.action';
import { createPentool } from './pentool.model';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

const calcPositionInCanvas = (input: IPosition, boardState: IBoard): IPosition => {
	const { scale, topLeft } = boardState;
	return {
		x: (input.x - topLeft.x) / scale,
		y: (input.y - topLeft.y) / scale,
	};
};

@Injectable()
export class PentoolEpics {
	constructor(
		private toolboxActions: ToolboxActions,
		private pathActions: PathActions,
		private anchorActions: AnchorActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setPentoolTraitOnSelected()),
			createEpicMiddleware(this.addThenListenUpdateUntilAnchorPlaced()),
			createEpicMiddleware(this.zipIfHeadAnchorClicked()),
		];
	}

	private setPentoolTraitOnSelected = (): Epic<IToolboxGeneralAction, IAppState> => {
		return (action$, store) => action$
			.ofType(ToolboxActionType.TOOLBOX_SELECT_TOOL)
			.filter(action => action.payload.toolName === ToolName.Pentool)
			.map(action => this.toolboxActions.setToolTraitAction(createPentool()));
	}

	private addThenListenUpdateUntilAnchorPlaced = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		const afterDown$ = new Subject<FluxStandardAction<any, undefined>>();
		let lastDownPosition: IPosition;
		let movingAnchorIdx: number;
		return (action$, store) => {
			const createAddAnchorMapper = (action: FluxStandardAction<any, undefined>) => {
				const boardState = <IBoard>store.getState().canvas.get('board').toJS();
				const position = calcPositionInCanvas(<IPosition>action.payload.absPoint, boardState);
				return this.pathActions.addAnchorAction(action.payload.targetIn, position);
			};
			return action$
				.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS)
				.do(action => {
					afterDown$.next(action);
					lastDownPosition = <IPosition>action.payload.absPoint;
				})
				.map(createAddAnchorMapper)
				.switchMap(() => raceStatic<FluxStandardAction<any, undefined>>(
					action$ // Releasing right after mousedown create basic line
						.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS)
						.map(createAddAnchorMapper),
					action$ // Dragging before release creating bezier curve
						.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
						.take(1)
						.map(action => {
							return this.anchorActions.changeType(
								action.payload.targetIn,
								action.payload.idx,
								AnchorType.QuadraticBezierCurve,
							);
						})
						.switchMap(() => action$
							.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
							.map(action => {
								const boardState = <IBoard>store.getState().canvas.get('board').toJS();
								const reversePosition: IPosition = {
									x: (lastDownPosition.x * 2) - action.payload.absPoint.x,
									y: (lastDownPosition.y * 2) - action.payload.absPoint.y,
								};
								const position = calcPositionInCanvas(reversePosition, boardState);
								return this.anchorActions.updateBezierHandle(
									action.payload.targetIn,
									action.payload.idx,
									position,
								);
							})
							.do(action => movingAnchorIdx = action.payload.idx),
						)
						.takeUntil(action$
							.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS)
							.map(createAddAnchorMapper)
							.map(action => this.anchorActions.changeType(
								action.payload.targetIn,
								movingAnchorIdx,
								AnchorType.SmoothQuadraticBezierCurveTo,
							)),
						),
				))
				.switchMap(() => action$
					.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
					.map(action => {
						const boardState = <IBoard>store.getState().canvas.get('board').toJS();
						const position = calcPositionInCanvas(<IPosition>action.payload.absPoint, boardState);
						return this.anchorActions.updatePosition(action.payload.targetIn, action.payload.idx, position);
					})
					.takeUntil(afterDown$
						.map(action => this.pathActions.removeLastAnchorAction(action.payload.targetIn)),
					),
				)
				.takeUntil(action$.ofType(PathActionType.PATH_ZIP_PATH));
		};
	}

	private zipIfHeadAnchorClicked = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => action$
			.filter(action =>
				action.type === PentoolActionType.PENTOOL_MOUSE_DOWN_ON_ANCHOR
				&& action.payload.idx === 0)
			.map(action => this.pathActions.removeLastAnchorAction(action.payload.targetIn))
			.map(action => this.pathActions.zipPathAction(action.payload))
			.mapTo(doneAction); // Preventing double dispatch
	}
}
