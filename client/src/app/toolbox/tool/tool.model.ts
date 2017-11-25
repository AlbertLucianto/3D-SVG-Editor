import { List, Record } from 'immutable';

import { RegisteredListener } from '../../canvas/canvas.model';
import { ToolName } from '../toolbox.model';

export interface IToolBase {
	name: ToolName;
	listeners: List<RegisteredListener>;
}

export class ToolBase extends Record({ listeners: List([]), name: '' }) implements IToolBase {
	name: ToolName;
	listeners: List<RegisteredListener>;

	constructor(initTool: IToolBase) {
		super(initTool);
	}
}
