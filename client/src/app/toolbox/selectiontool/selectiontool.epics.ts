import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { List } from 'immutable';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { CanvasActions } from '../../canvas/canvas.action';
import { IPosition } from '../../canvas/canvas.model';
import { DrawableActions } from '../../canvas/drawable/drawable.action';
import { Drawable } from '../../canvas/drawable/drawable.model';
import { Path } from '../../canvas/path/path.model';
import { ColorAttribute } from '../../color/rim/rim.model';
import { SliderActions } from '../../color/slider/slider.action';
import { IAppState } from '../../store/model';
import { IToolboxGeneralAction, ToolboxActions, ToolboxActionType } from '../toolbox.action';
import { ToolName } from '../toolbox.model';
import { IMouseDownOnDrawableAction, IMouseMoveOnCanvasAction, SelectiontoolActionType } from './selectiontool.action';
import { createSelectiontool } from './selectiontool.model';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

const findMostCommonAncestor = (routePaths: List<List<number>>) =>
routePaths.reduce<List<number>>((common, path) =>
	common.reduce((acc, val, idx) => val === path.get(idx) ? acc.push(val) : acc, List<number>([])),
	routePaths.get(0));

const calcDrawableMove = (current: IPosition, start: IPosition, scale: number) => {
	return {
		x: (current.x - start.x) / scale,
		y: (current.y - start.y) / scale,
	};
};

@Injectable()
export class SelectiontoolEpics {
	constructor(
		private toolboxActions: ToolboxActions,
		private drawableActions: DrawableActions,
		private sliderActions: SliderActions,
		private canvasActions: CanvasActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setSelectiontoolTraitOnSelected()),
			createEpicMiddleware(this.selectDrawableOnClick()),
			createEpicMiddleware(this.deselectOnClickAway()),
			createEpicMiddleware(this.changeColorPickerOnSelect(ColorAttribute.Fill)),
			createEpicMiddleware(this.changeColorPickerOnSelect(ColorAttribute.Outline)),
			createEpicMiddleware(this.deleteObjectWhenPressed()),
			createEpicMiddleware(this.moveDrawableOnDrag()),
		];
	}

	private setSelectiontoolTraitOnSelected = (): Epic<IToolboxGeneralAction, IAppState> => {
		return (action$, store) => action$
			.ofType(ToolboxActionType.TOOLBOX_SELECT_TOOL)
			.filter(action => action.payload.toolName === ToolName.Selectiontool)
			.map(action => this.toolboxActions.setToolTraitAction(createSelectiontool()));
	}

	private selectDrawableOnClick = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => action$
			.ofType(SelectiontoolActionType.SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE)
			.map(action => this.drawableActions.selectAction(action.payload.targetIn))
			.mapTo(doneAction); // Preventing double dispatch
	}

	private deselectOnClickAway = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => action$
			.ofType(SelectiontoolActionType.SELECTIONTOOL_MOUSE_DOWN_ON_CANVAS)
			.map(action => this.drawableActions.deselectAllAction())
			.mapTo(doneAction); // Preventing double dispatch
	}

	private changeColorPickerOnSelect = (attribute: ColorAttribute): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => action$
			.ofType(SelectiontoolActionType.SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE)
			.map((action: IMouseDownOnDrawableAction) => {
				const path = <Path>store.getState().canvas.getIn(Drawable.toRoutePath(action.payload.targetIn));
				if (typeof path !== 'undefined') { return this.sliderActions.changeColor(attribute, path[attribute]); }
				return doneAction;
			});
	}

	private deleteObjectWhenPressed = (): Epic<KeyboardEvent|FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => Observable.fromEvent<KeyboardEvent>(document, 'keydown')
			.throttle(() => Observable.fromEvent<KeyboardEvent>(document, 'keyup'))
			.filter(e => {
				const key = e.which || e.keyCode;
				return key === 8; // Delete key
			})
			.do(() => this.canvasActions.pushHistory())
			.do(() => store.getState().canvas.selected.forEach(targetIn =>
				this.drawableActions.deleteDrawableAction(targetIn.toArray())))
			.do(() => {
				const parentIn = findMostCommonAncestor(store.getState().canvas.selected);
				if (parentIn) { this.drawableActions.refreshAllRoutePathIn(parentIn.slice(0, -1).toArray()); }
			})
			.map(() => this.drawableActions.deselectAllAction())
			.mapTo(doneAction);
	}

	private moveDrawableOnDrag = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		const MOVE_STEP_PUSH_HISTORY = 2; // Tolerance for mousedown, usually leads to move cursor a bit
		let moveSteps = 0;
		return (action$, store) => action$
			.ofType(SelectiontoolActionType.SELECTIONTOOL_MOUSE_DOWN_ON_DRAWABLE)
			.do(() => moveSteps = 0)
			.switchMap((downAction: IMouseDownOnDrawableAction) => {
				const { scale } = store.getState().canvas.board;
				let lastCursorPos = downAction.payload.cursorPosition;
				return action$
				.ofType(SelectiontoolActionType.SELECTIONTOOL_MOUSE_MOVE_ON_CANVAS)
				.do((moveAction: IMouseMoveOnCanvasAction) => {
					if (moveSteps++ === MOVE_STEP_PUSH_HISTORY) { this.canvasActions.pushHistory(); } // Undoable
					const drawableMoved = calcDrawableMove(moveAction.payload, lastCursorPos, scale);
					store.getState().canvas.selected.forEach(targetIn => { // Can be optimised later using GPU.js
						this.drawableActions.updatePosition(
							targetIn.toArray(),
							(pos: IPosition) => ({
								x: pos.x + drawableMoved.x,
								y: pos.y + drawableMoved.y,
							}));
					});
					lastCursorPos = moveAction.payload;
				})
				.takeUntil(Observable.fromEvent(document, 'mouseup'));
			})
			.mapTo(doneAction);
	}
}
