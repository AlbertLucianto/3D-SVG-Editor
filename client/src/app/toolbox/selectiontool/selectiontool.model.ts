import { List } from 'immutable';

import { ActionFromEvent, RegisteredListener } from '../../canvas/canvas.model';
import { ToolBase } from '../tool/tool.model';
import { ToolName } from '../toolbox.model';
import { SelectiontoolActions } from './selectiontool.action';

export const createSelectiontool = (): ToolBase => {
	const actions = new SelectiontoolActions();

	const mouseDownOnDrawable: ActionFromEvent = (e: MouseEvent, { triggeringDrawable }) => {
		e.stopPropagation();
		const pathFromRoot = [...triggeringDrawable.routeParentPath.toArray(), triggeringDrawable.idx];
		return actions.mouseDownOnDrawableAction(pathFromRoot, { x: e.clientX, y: e.clientY });
	};

	const mouseDownOnCanvas: ActionFromEvent = (e: MouseEvent) => {
		return actions.mouseDownOnCanvas();
	};

	const mouseMoveOnCanvas: ActionFromEvent = (e: MouseEvent) => {
		return actions.mouseMoveOnCanvas({ x: e.clientX, y: e.clientY });
	};

	const mouseUpOnWindow: ActionFromEvent = (e: MouseEvent) => {
		return actions.mouseUpOnWindow();
	};

	const keyDownOnWindow: ActionFromEvent = (e: KeyboardEvent) => {
		return actions.keyDownOnWindow(e);
	};

	return new ToolBase({
		name: ToolName.Selectiontool,
		listeners: List<RegisteredListener>([
			{ name: 'mousedown', handler: mouseDownOnDrawable, target: 'path' },
			{ name: 'mousedown', handler: mouseDownOnDrawable, target: 'group' },
			{ name: 'mousedown', handler: mouseDownOnCanvas, target: 'canvas' },
			{ name: 'mousemove', handler: mouseMoveOnCanvas, target: 'canvas' },
			{ name: 'mouseup', handler: mouseUpOnWindow, target: 'window' },
			{ name: 'keydown', handler: keyDownOnWindow, target: 'window' },
		]),
	});
};
