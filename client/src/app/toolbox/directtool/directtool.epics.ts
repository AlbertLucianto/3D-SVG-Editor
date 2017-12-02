import { Injectable } from '@angular/core';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { IAppState } from '../../store/model';
import { IToolboxGeneralAction, ToolboxActions, ToolboxActionType } from '../toolbox.action';
import { ToolName } from '../toolbox.model';
import { createDirectSelectiontool } from './directtool.model';

@Injectable()
export class DirectSelectiontoolEpics {
	constructor(
		private toolboxActions: ToolboxActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setDirecttoolTraitOnSelected()),
		];
	}

	private setDirecttoolTraitOnSelected = (): Epic<IToolboxGeneralAction, IAppState> => {
		return (action$, store) => action$
			.ofType(ToolboxActionType.TOOLBOX_SELECT_TOOL)
			.filter(action => action.payload.toolName === ToolName.DirectSelectiontool)
			.map(action => this.toolboxActions.setToolTraitAction(createDirectSelectiontool()));
	}
}
