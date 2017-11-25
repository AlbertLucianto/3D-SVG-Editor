import { ToolName } from '../toolbox.model';

export interface IToolContext {
	toolName: ToolName;
	isActive: boolean;
	[atts: string]: any;
}

export abstract class ToolBaseComponent {
	context: IToolContext;
}
