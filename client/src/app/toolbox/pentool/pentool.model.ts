import { List } from 'immutable';

import { ActionFromEvent, RegisteredListener } from '../../canvas/canvas.model';
import { Drawable } from '../../canvas/drawable/drawable.model';
import { ToolBase } from '../tool/tool.model';
import { ToolName } from '../toolbox.model';
import { PentoolActions } from './pentool.action';

export const createPentool = (): ToolBase => {
	const actions = new PentoolActions();

	const mouseDownOnCanvas: ActionFromEvent = (e: MouseEvent, triggeringDrawable: Drawable) => {
		const pathFromRoot = [ ...triggeringDrawable.routeParentPath.toJS(), triggeringDrawable.idx ];
		return actions.mouseDownOnCanvasAction(pathFromRoot, { x: e.clientX, y: e.clientY });
	};

	const mouseUpOnCanvas: ActionFromEvent = (e: MouseEvent, triggeringDrawable: Drawable) => {
		const pathFromRoot = [ ...triggeringDrawable.routeParentPath.toJS(), triggeringDrawable.idx ];
		return actions.mouseUpOnCanvasAction(pathFromRoot, { x: e.clientX, y: e.clientY });
	};

	const mouseMoveOnCanvas: ActionFromEvent = (e: MouseEvent, triggeringDrawable: Drawable) => {
		const pathFromRoot = [ ...triggeringDrawable.routeParentPath.toJS(), triggeringDrawable.idx ];
		return actions.moveCursorOnCanvasAction(pathFromRoot, triggeringDrawable.get('children').size - 1, { x: e.clientX, y: e.clientY });
	};

	const mouseDownOnHeadAnchor: ActionFromEvent = (e: MouseEvent, triggeringDrawable: Drawable) => {
		// e.stopPropagation();
		const pathFromRoot = [ ...triggeringDrawable.routeParentPath.toJS() ];
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
	});
};
