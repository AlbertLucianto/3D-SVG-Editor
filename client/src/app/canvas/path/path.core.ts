import { CanvasState, IPosition } from '../canvas.model';
import { Path } from './path.model';

export const addAnchor = (state: CanvasState, targetIn: Array<number>, anchorPosition: IPosition) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		return accessedPath.addAnchor(anchorPosition);
	});
};

export const updateAnchor = (state: CanvasState, targetIn: Array<number>, idx: number, anchorPosition: IPosition) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		return accessedPath.updateAnchor(idx, anchorPosition);
	});
};

export const removeAnchor = (state: CanvasState, targetIn: Array<number>, idx: number) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		return accessedPath.removeAnchor(idx);
	});
};

export const removeLastAnhcor = (state: CanvasState, targetIn: Array<number>) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		return accessedPath.removeLastAnchor();
	});
};

export const zipPath = (state: CanvasState, targetIn: Array<number>) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		return accessedPath.zip();
	});
};
