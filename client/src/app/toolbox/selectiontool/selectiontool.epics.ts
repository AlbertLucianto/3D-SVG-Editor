import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { DrawableActions } from '../../canvas/drawable/drawable.action';
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
		private drawableActions: DrawableActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setSelectiontoolTraitOnSelected()),
			createEpicMiddleware(this.selectDrawableOnClick()),
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
}
