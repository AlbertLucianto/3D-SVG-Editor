import { List } from 'immutable';

import { RegisteredListener } from '../../canvas/canvas.model';
import { ToolBase } from '../tool/tool.model';
import { ToolName } from '../toolbox.model';
// import { SelectiontoolActions } from './selectiontool.action';

export const createSelectiontool = (): ToolBase => {
	// const actions = new SelectiontoolActions();
	return new ToolBase({
		name: ToolName.Selectiontool,
		listeners: List<RegisteredListener>([]),
	});
};
