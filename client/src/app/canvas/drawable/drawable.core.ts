import { List } from 'immutable';

import { CanvasState, IPosition } from '../canvas.model';
import { Drawable } from './drawable.model';

export const selectDrawable = (state: CanvasState, targetIn: Array<number>) => {
	return state.set('selected', List([ List(targetIn) ]));
};

export const addSelectDrawable = (state: CanvasState, targetIn: Array<number>) => {
	return state.update('selected', (selected: List<List<number>>) => selected.push(List(targetIn)));
};

export const deselectDrawable = (state: CanvasState, targetIn: Array<number>) => {
	return state;
};

export const deselectAllDrawable = (state: CanvasState) => {
	return state.set('selected', List<List<number>>([]));
};

export const deleteDrawable = (state: CanvasState, targetIn: Array<number>) => {
	return state.removeIn(Drawable.toRoutePath(targetIn));
};

export const refreshAllRoutePathIn = (state: CanvasState, parentIn: Array<number>) => {
	return state.updateIn(Drawable.toRoutePath(parentIn, true), (children: List<Drawable>) =>
		children.map((drawable, idx) => drawable.setRouteParentPath(List(parentIn)).setIndex(idx)),
	);
};

export const updatePosition = (state: CanvasState, targetIn: Array<number>, projection: (pos: IPosition) => IPosition) => {
	return state.updateIn(
		Drawable.toRoutePath(targetIn),
		(drawable: Drawable) => drawable.updatePosition(projection));
};
