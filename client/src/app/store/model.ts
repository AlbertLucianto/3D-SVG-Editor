import { CanvasState } from '../canvas/canvas.model';
import { ToolboxState } from '../toolbox/toolbox.model';

export interface IAppState {
	canvas?: CanvasState;
	toolbox?: ToolboxState;
}
