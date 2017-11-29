import { AnchorType } from '../anchor/anchor.model';
import { CanvasState, IPosition } from '../canvas.model';
import { Path } from './path.model';

export const addAnchor = (state: CanvasState, targetIn: Array<number>, anchorPosition: IPosition, anchorType?: AnchorType) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		return accessedPath.addAnchor(anchorPosition, anchorType);
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
