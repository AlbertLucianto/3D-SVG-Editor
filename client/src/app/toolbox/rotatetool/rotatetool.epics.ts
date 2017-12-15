import { Injectable } from '@angular/core';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { IAppState } from '../../store/model';
import { IToolboxGeneralAction, ToolboxActions, ToolboxActionType } from '../toolbox.action';
import { ToolName } from '../toolbox.model';
import { createRotatetool } from './rotatetool.model';

@Injectable()
export class RotatetoolEpics {
	constructor(
		private toolboxActions: ToolboxActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setRotatetoolTraitOnSelected()),
		];
	}

	private setRotatetoolTraitOnSelected = (): Epic<IToolboxGeneralAction, IAppState> => {
		return (action$, store) => action$
			.ofType(ToolboxActionType.TOOLBOX_SELECT_TOOL)
			.filter(action => action.payload.toolName === ToolName.Selectiontool)
			.map(action => this.toolboxActions.setToolTraitAction(createRotatetool()));
	}
}
