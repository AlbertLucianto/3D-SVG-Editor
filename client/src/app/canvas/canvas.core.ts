import { List, Stack } from 'immutable';

import { CanvasState, IPosition, Position } from './canvas.model';
import { Drawable } from './drawable/drawable.model';

const MIN_CANVAS_SCALE = 0.2;
const MAX_CANVAS_SCALE = 2;

export const updateTopLeft = (state: CanvasState, position: IPosition): CanvasState => {
	return <CanvasState>state.setIn(['board', 'topLeft'], new Position(position));
};

export const updateScale = (state: CanvasState, change: number): CanvasState => {
	return <CanvasState>state.updateIn(
		['board', 'scale'],
		(scale: number) => (
			Math.min(Math.max(
				scale + change, MIN_CANVAS_SCALE),
				MAX_CANVAS_SCALE)),
		);
};

export const updateMoved = (state: CanvasState, position: IPosition): CanvasState => {
	return <CanvasState>state.setIn(['board', 'moved'], new Position(position));
};

export const pushHistory = (state: CanvasState): CanvasState => {
	return <CanvasState>state.update('history', (history: Stack<List<Drawable>>) => history.push(state.root));
};

export const popHistory = (state: CanvasState): CanvasState => {
	const lastRoot = state.history.peek();
	return lastRoot ? <CanvasState>state
		.set('root', lastRoot)
		.update('history', (history: Stack<List<Drawable>>) => history.pop())
		: state;
};
