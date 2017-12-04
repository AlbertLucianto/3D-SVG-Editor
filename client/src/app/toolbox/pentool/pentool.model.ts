import { List, Map } from 'immutable';

import { ActionFromEvent, RegisteredListener } from '../../canvas/canvas.model';
import { ToolBase } from '../tool/tool.model';
import { ToolName } from '../toolbox.model';
import { PentoolActions } from './pentool.action';

export const createPentool = (): ToolBase => {
	const actions = new PentoolActions();

	const mouseDownOnCanvas: ActionFromEvent = (e: MouseEvent) =>
		actions.mouseDownOnCanvasAction({ x: e.clientX, y: e.clientY });

	const mouseUpOnCanvas: ActionFromEvent = (e: MouseEvent) =>
		actions.mouseUpOnCanvasAction({ x: e.clientX, y: e.clientY });

	const mouseMoveOnCanvas: ActionFromEvent = (e: MouseEvent) =>
		actions.moveCursorOnCanvasAction({ x: e.clientX, y: e.clientY });

	const mouseDownOnHeadAnchor: ActionFromEvent = (e: MouseEvent, { triggeringDrawable }) => {
		// e.stopPropagation();
		const pathFromRoot = triggeringDrawable.routeParentPath.toArray();
		return actions.mouseDownOnAnchorAction(pathFromRoot, triggeringDrawable.idx);
	};

	return new ToolBase({
		name: ToolName.Pentool,
		listeners: List<RegisteredListener>([
			{ name: 'mousedown', handler: mouseDownOnCanvas, target: 'canvas' },
			{ name: 'mouseup', handler: mouseUpOnCanvas, target: 'canvas' },
			{ name: 'mousemove', handler: mouseMoveOnCanvas, target: 'canvas' },
			{ name: 'mousedown', handler: mouseDownOnHeadAnchor, target: 'anchor' },
		]),
		others: Map({ activePathIn: List([]) }),
	});
};
