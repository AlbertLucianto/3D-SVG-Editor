import { List } from 'immutable';

import { ActionFromEvent, RegisteredListener } from '../../canvas/canvas.model';
import { ToolBase } from '../tool/tool.model';
import { ToolName } from '../toolbox.model';
import { SelectiontoolActions } from './selectiontool.action';

export const createSelectiontool = (): ToolBase => {
	const actions = new SelectiontoolActions();

	const mouseDownOnDrawable: ActionFromEvent = (e: MouseEvent, { triggeringDrawable }) => {
		const pathFromRoot = [...triggeringDrawable.routeParentPath.toArray(), triggeringDrawable.idx];
		return actions.mouseDownOnDrawableAction(pathFromRoot);
	};

	return new ToolBase({
		name: ToolName.Selectiontool,
		listeners: List<RegisteredListener>([
			{ name: 'mousedown', handler: mouseDownOnDrawable, target: 'path' },
			{ name: 'mousedown', handler: mouseDownOnDrawable, target: 'group' },
		]),
	});
};
