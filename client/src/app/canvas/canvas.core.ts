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
	type HistoryType = Stack<List<Drawable>>;
	return <CanvasState>state.update('history', (history: HistoryType) => {
		const head = state.headHistory;
		// '.fill(anything)' is required to be iterable, otherwise reduce stops rightaway
		const newHistory = new Array(head).fill(true).reduce<HistoryType>(acc => acc.pop(), history);
		return newHistory.push(state.root);
	}).set('headHistory', 0);
};

export const undo = (state: CanvasState): CanvasState => {
	const head = state.headHistory + 1;
	const prevRoot = state.history.get(head);
	return !!prevRoot ? <CanvasState>state.set('root', prevRoot).set('headHistory', head) : state;
};

export const redo = (state: CanvasState): CanvasState => {
	const head = Math.max(state.headHistory - 1, 0);
	const prevRoot = state.history.get(head);
	return !!prevRoot ? <CanvasState>state.set('root', prevRoot).set('headHistory', head) : state;
};
