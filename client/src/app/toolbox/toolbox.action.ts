import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ToolBase } from './tool/tool.model';
import { ToolName } from './toolbox.model';

/**
 * Using CONSTANT naming convention and holding same value
 * to be able to check if an enum value is in enum keys
 */
export enum ToolboxActionType {
	TOOLBOX_SELECT_TOOL = 'TOOLBOX_SELECT_TOOL',
	TOOLBOX_SET_TOOL_TRAIT = 'TOOLBOX_SET_TOOL_TRAIT',
}

export type ISelectToolAction = FluxStandardAction<{
	toolName: ToolName,
}, undefined>;

export type ISetToolTraitAction = FluxStandardAction<{
	tool: ToolBase,
}, undefined>;

export type IToolboxGeneralAction = FluxStandardAction<{ // Need to improve to be more elegant!
	toolName?: ToolName,
	tool?: ToolBase,
}, undefined>;

@Injectable()
export class ToolboxActions {
	/**
	 * Note:
	 *
	 * Here it does not need any `@dispatch()` decorator as it will only be
	 * dispatched by view components, not epics
	 */
	selectToolAction = (toolName: ToolName): ISelectToolAction => ({
		type: ToolboxActionType.TOOLBOX_SELECT_TOOL,
		payload: { toolName },
		meta: undefined,
	})

	setToolTraitAction = (tool: ToolBase): ISetToolTraitAction => ({
		type: ToolboxActionType.TOOLBOX_SET_TOOL_TRAIT,
		payload: { tool },
		meta: undefined,
	})
}
