import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { DrawableActions } from '../../canvas/drawable/drawable.action';
import { Drawable } from '../../canvas/drawable/drawable.model';
import { Path } from '../../canvas/path/path.model';
import { ColorAttribute } from '../../color/rim/rim.model';
import { SliderActions } from '../../color/slider/slider.action';
import { IAppState } from '../../store/model';
import { IToolboxGeneralAction, ToolboxActions, ToolboxActionType } from '../toolbox.action';
import { ToolName } from '../toolbox.model';
import { SelectiontoolActionType } from './selectiontool.action';
import { createSelectiontool } from './selectiontool.model';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

@Injectable()
export class SelectiontoolEpics {
	constructor(
		private toolboxActions: ToolboxActions,
		private drawableActions: DrawableActions,
		private sliderActions: SliderActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setSelectiontoolTraitOnSelected()),
			createEpicMiddleware(this.selectDrawableOnClick()),
			createEpicMiddleware(this.deselectOnClickAway()),
			createEpicMiddleware(this.changeColorPickerOnSelect(ColorAttribute.Fill)),
			createEpicMiddleware(this.changeColorPickerOnSelect(ColorAttribute.Outline)),
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
			.map(action => this.drawableActions.selectAction(action.payload))
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
			.map(action => {
				const path = <Path>store.getState().canvas.root.getIn(Drawable.toRoutePath(action.payload));
				if (typeof path !== 'undefined') {
					return this.sliderActions.changeColor(attribute, path[attribute]);
				}
				return doneAction;
			});
	}
}
