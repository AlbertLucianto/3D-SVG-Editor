import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';

import { PathActions } from '../../../canvas/path/path.action';
import { IAppState } from '../../../store/model';
import { IToolboxGeneralAction, ToolboxActions, ToolboxActionType } from '../../toolbox.action';
import { ToolName } from '../../toolbox.model';
import { PentoolActionType } from '../pentool.action';
import { createPentool } from '../pentool.model';
import { PentoolDrawEpics } from './pentool.draw.epics';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

@Injectable()
export class PentoolEpics {
	constructor(
		private toolboxActions: ToolboxActions,
		private pathActions: PathActions,
		private drawEpics: PentoolDrawEpics) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.setPentoolTraitOnSelected()),
			createEpicMiddleware(this.zipIfHeadAnchorClicked()),
			...this.drawEpics.createEpics(),
		];
	}

	private setPentoolTraitOnSelected = (): Epic<IToolboxGeneralAction, IAppState> => {
		return (action$, store) => action$
			.ofType(ToolboxActionType.TOOLBOX_SELECT_TOOL)
			.filter(action => action.payload.toolName === ToolName.Pentool)
			.map(action => this.toolboxActions.setToolTraitAction(createPentool()));
	}

	private zipIfHeadAnchorClicked = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => action$
			.filter(action =>
				action.type === PentoolActionType.PENTOOL_MOUSE_DOWN_ON_ANCHOR
				&& action.payload.idx === 0)
			.map(action => this.pathActions.zipPathAction(action.payload.targetIn))
			.mapTo(doneAction); // Preventing double dispatch
	}
}
