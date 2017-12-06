import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { CanvasActions } from '../../canvas/canvas.action';
import { IBoard, IPosition } from '../../canvas/canvas.model';
import { IAppState } from '../../store/model';
import { IToolboxGeneralAction, ToolboxActions, ToolboxActionType } from '../toolbox.action';
import { ToolName } from '../toolbox.model';
import { CanvastoolActionType } from './canvastool.action';
import { createCanvastool } from './canvastool.model';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

const calcCanvasPosition = (input: IPosition, start: IPosition, lastMoved: IPosition): IPosition => {
	return {
		x: (input.x - start.x) + lastMoved.x,
		y: (input.y - start.y) + lastMoved.y,
	};
};

@Injectable()
export class CanvastoolEpics {
	constructor(
		private toolboxActions: ToolboxActions,
		private canvasActions: CanvasActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setCanvastoolTraitOnSelected()),
			createEpicMiddleware(this.moveCanvasOnMouseCycle()),
		];
	}

	private setCanvastoolTraitOnSelected = (): Epic<IToolboxGeneralAction, IAppState> => {
		return (action$, store) => action$
			.ofType(ToolboxActionType.TOOLBOX_SELECT_TOOL)
			.filter(action => action.payload.toolName === ToolName.Canvastool)
			.map(action => this.toolboxActions.setToolTraitAction(createCanvastool()));
	}

	private moveCanvasOnMouseCycle = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => action$
			.ofType(CanvastoolActionType.CANVASTOOL_MOUSE_DOWN_ON_CANVAS)
			.switchMap(startAction => {
				const { moved } = <IBoard>store.getState().canvas.get('board').toJS();
				return action$
					.ofType(CanvastoolActionType.CANVASTOOL_MOUSE_MOVE_ON_CANVAS)
					.map(moveAction => {
						const newPosition = calcCanvasPosition(moveAction.payload, startAction.payload, moved);
						return this.canvasActions.updateMoved(newPosition);
					})
					.takeUntil(action$
						.ofType(CanvastoolActionType.CANVASTOOL_MOUSE_UP_ON_CANVAS),
					)
					.mapTo(doneAction); // To prevent `updateMoved` dispatched twice
				},
			);
	}
}
