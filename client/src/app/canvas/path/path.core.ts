import { List } from 'immutable';

import { AnchorType } from '../anchor/anchor.model';
import { CanvasState, IPosition, Position } from '../canvas.model';
import { Drawable } from '../drawable/drawable.model';
import { Path } from './path.model';

export const createNewIn = (state: CanvasState, parentIn: Array<number>, startPosition: IPosition) => {
	return state.updateIn(['root', ...Drawable.toRoutePath(parentIn, true)], (children: List<Drawable>) => {
		return children.push(new Path({
			routeParentPath: List(parentIn),
			idx: children.size,
			absPosition: new Position({ x: 0, y: 0 }),
		}).addAnchor(startPosition));
	});
};

export const addAnchor = (state: CanvasState, targetIn: Array<number>, anchorPosition: IPosition, anchorType?: AnchorType) => {
	return state.updateIn(['root', ...Drawable.toRoutePath(targetIn)], (accessedPath: Path): Path => {
		return accessedPath.addAnchor(anchorPosition, anchorType);
	});
};

export const removeAnchor = (state: CanvasState, targetIn: Array<number>, idx: number) => {
	return state.updateIn(['root', ...Drawable.toRoutePath(targetIn)], (accessedPath: Path): Path => {
		return accessedPath.removeAnchor(idx);
	});
};

export const removeLastAnhcor = (state: CanvasState, targetIn: Array<number>) => {
	return state.updateIn(['root', ...Drawable.toRoutePath(targetIn)], (accessedPath: Path): Path => {
		return accessedPath.removeLastAnchor();
	});
};

export const zipPath = (state: CanvasState, targetIn: Array<number>) => {
	return state.updateIn(['root', ...Drawable.toRoutePath(targetIn)], (accessedPath: Path): Path => {
		return accessedPath.zip();
	});
};
