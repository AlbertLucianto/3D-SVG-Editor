import { Injectable } from '@angular/core';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { IAppState } from '../../store/model';
import { IToolboxGeneralAction, ToolboxActions, ToolboxActionType } from '../toolbox.action';
import { ToolName } from '../toolbox.model';
import { createSelectiontool } from './selectiontool.model';

@Injectable()
export class SelectiontoolEpics {
	constructor(private toolboxActions: ToolboxActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setSelectiontoolTraitOnSelected()),
		];
	}

	private setSelectiontoolTraitOnSelected = (): Epic<IToolboxGeneralAction, IAppState> => {
		return (action$, store) => action$
			.ofType(ToolboxActionType.TOOLBOX_SELECT_TOOL)
			.filter(action => action.payload.toolName === ToolName.Selectiontool)
			.map(action => this.toolboxActions.setToolTraitAction(createSelectiontool()));
	}
}
