import { List } from 'immutable';

import { RegisteredListener } from '../../canvas/canvas.model';
import { ToolBase } from '../tool/tool.model';
import { ToolName } from '../toolbox.model';

export const createDirectSelectiontool = (): ToolBase => {
	return new ToolBase({
		name: ToolName.DirectSelectiontool,
		listeners: List<RegisteredListener>([]),
	});
};
