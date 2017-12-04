import { List, Map, Record } from 'immutable';

import { RegisteredListener } from '../../canvas/canvas.model';
import { ToolName } from '../toolbox.model';

export interface IToolBase {
	name: ToolName;
	listeners: List<RegisteredListener>;
	others?: Map<string, any>;
}

export class ToolBase extends Record({ listeners: List([]), name: '', others: Map({}) }) implements IToolBase {
	name: ToolName;
	listeners: List<RegisteredListener>;
	others: Map<string, any>;

	constructor(initTool: IToolBase) {
		super(initTool);
	}
}
