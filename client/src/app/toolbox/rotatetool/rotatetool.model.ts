import { List } from 'immutable';

import { RegisteredListener } from '../../canvas/canvas.model';
import { ToolBase } from '../tool/tool.model';
import { ToolName } from '../toolbox.model';

export const createRotatetool = (): ToolBase => {
	return new ToolBase({
		name: ToolName.Rotatetool,
		listeners: List<RegisteredListener>([]),
	});
};
