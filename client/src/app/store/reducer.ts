import { combineReducers } from 'redux';
import { canvasReducer } from '../canvas/canvas.reducer';
import { colorPickerReducer } from '../color/color.reducer';
import { toolboxReducer } from '../toolbox/toolbox.reducer';

export const rootReducer = combineReducers({
	canvas: canvasReducer,
	toolbox: toolboxReducer,
	color: colorPickerReducer,
});
