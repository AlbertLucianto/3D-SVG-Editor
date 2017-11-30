import { CanvasState } from '../canvas/canvas.model';
import { ColorPickerState } from '../color/color.model';
import { ToolboxState } from '../toolbox/toolbox.model';

export interface IAppState {
	canvas?: CanvasState;
	toolbox?: ToolboxState;
	color?: ColorPickerState;
}
