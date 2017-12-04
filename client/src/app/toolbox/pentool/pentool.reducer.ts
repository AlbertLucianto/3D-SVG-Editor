import { List } from 'immutable';
import { Action, Reducer } from 'redux';

import { ToolboxState } from '../toolbox.model';
import { IChangeActivePathAction, PentoolActionType } from './pentool.action';

export const pentoolReducer: Reducer<ToolboxState> = (state: ToolboxState, action: Action) => {
	switch (action.type) {
		case PentoolActionType.PENTOOL_CHANGE_ACTIVE_PATH:
			const changeActiveAction = <IChangeActivePathAction>action;
			return <ToolboxState>state.setIn(['selected', 'others', 'activePathIn'], List(changeActiveAction.payload));
	}
	return state;
};
