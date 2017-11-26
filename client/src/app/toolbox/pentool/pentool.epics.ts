import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
// import { raceStatic } from 'rxjs/operator/race';
import { Subject } from 'rxjs/Subject';

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
		private pathActions: PathActions) { }

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
		const afterDown = new Subject<FluxStandardAction<any, undefined>>();
		return (action$, store) => action$
			.ofType(PentoolActionType.PENTOOL_MOUSE_DOWN_ON_CANVAS)
			.map(action => {
				afterDown.next(action);
				const boardState = <IBoard>store.getState().canvas.get('board').toJS();
				const position = calcPositionInCanvas(<IPosition>action.payload.absPoint, boardState);
				return this.pathActions.addAnchorAction(action.payload.targetIn, position);
			})
			.switchMap(() => action$
				.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
				.take(1)
				.map(action => this.pathActions.changeAnchorTypeAction(
					action.payload.targetIn,
					action.payload.idx,
					AnchorType.QuadraticBezierCurve,
				))
				.switchMap(() => action$
					.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
					.map(action => {
						console.log('curving');
						const boardState = <IBoard>store.getState().canvas.get('board').toJS();
						const position = calcPositionInCanvas(<IPosition>action.payload.absPoint, boardState);
						return this.pathActions.updateBezierHandleAction(
							action.payload.targetIn,
							action.payload.idx,
							position,
						);
					}),
				)
				.takeUntil(action$
					.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS),
				),
			)
			.switchMap(() => action$
				.ofType(PentoolActionType.PENTOOL_MOUSE_UP_ON_CANVAS)
				.map(action => {
					const boardState = <IBoard>store.getState().canvas.get('board').toJS();
					const position = calcPositionInCanvas(<IPosition>action.payload.absPoint, boardState);
					return this.pathActions.addAnchorAction(action.payload.targetIn, position);
				}),
			)
			.switchMap(() => action$
				.ofType(PentoolActionType.PENTOOL_MOUSE_MOVE_ON_CANVAS)
				.map(action => {
					const boardState = <IBoard>store.getState().canvas.get('board').toJS();
					const position = calcPositionInCanvas(<IPosition>action.payload.absPoint, boardState);
					return this.pathActions.updateAnchorAction(action.payload.targetIn, action.payload.idx, position);
				})
				.takeUntil(afterDown
					.map(action => this.pathActions.removeLastAnchorAction(action.payload.targetIn)),
				),
			)
			.takeUntil(action$.ofType(PathActionType.PATH_ZIP_PATH));
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
