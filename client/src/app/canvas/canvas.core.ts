import { CanvasState, IPosition, Position } from './canvas.model';

const MIN_CANVAS_SCALE = 0.2;
const MAX_CANVAS_SCALE = 2;

export const updateTopLeft = (state: CanvasState, position: IPosition): CanvasState => {
	return state.setIn(['board', 'topLeft'], new Position(position));
};

export const updateScale = (state: CanvasState, change: number): CanvasState => {
	return state.updateIn(
		['board', 'scale'],
		(scale: number) => (
			Math.min(Math.max(
				scale + change, MIN_CANVAS_SCALE),
				MAX_CANVAS_SCALE)),
		);
};

export const updateMoved = (state: CanvasState, position: IPosition): CanvasState => {
	return state.setIn(['board', 'moved'], new Position(position));
};
