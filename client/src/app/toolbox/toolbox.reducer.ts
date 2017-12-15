import { Action, Reducer } from 'redux';

import { CanvastoolActionType } from './canvastool/canvastool.action';
import { canvastoolReducer } from './canvastool/canvastool.reducer';
import { PentoolActionType } from './pentool/pentool.action';
import { pentoolReducer } from './pentool/pentool.reducer';
import { RotatetoolActionType } from './rotatetool/rotatetool.action';
import { rotatetoolReducer } from './rotatetool/rotatetool.reducer';
import { SelectiontoolActionType } from './selectiontool/selectiontool.action';
import { createSelectiontool } from './selectiontool/selectiontool.model';
import { selectiontoolReducer } from './selectiontool/selectiontool.reducer';
import { ISetToolTraitAction, ToolboxActionType } from './toolbox.action';
import { ToolboxState } from './toolbox.model';

export const toolboxReducer: Reducer<ToolboxState> = (
	state: ToolboxState = new ToolboxState({ selected: createSelectiontool() }),
	action: Action,
) => {
	switch (true) {
		case action.type in PentoolActionType:
			return pentoolReducer(state, action);
		case action.type in SelectiontoolActionType:
			return selectiontoolReducer(state, action);
		case action.type in CanvastoolActionType:
			return canvastoolReducer(state, action);
		case action.type in RotatetoolActionType:
			return rotatetoolReducer(state, action);
	}
	switch (action.type) {
		case ToolboxActionType.TOOLBOX_SELECT_TOOL:
			return state; // Let be handled by each tool epic, will dispatch below action
		case ToolboxActionType.TOOLBOX_SET_TOOL_TRAIT:
			return new ToolboxState({ selected: (<ISetToolTraitAction>action).payload.tool }); // Need some way to utilise Immutablility!
	}
	return state;
};
