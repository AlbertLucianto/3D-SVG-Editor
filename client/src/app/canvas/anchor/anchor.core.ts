import { CanvasState, IPosition } from '../canvas.model';
import { IinitDrawable } from '../drawable/drawable.model';
import { Path } from '../path/path.model';
import { AnchorFactory } from './anchor.factory';
import { AnchorType } from './anchor.model';
import { QuadraticBezierAnchor } from './bezier/bezier.model';

export const updatePosition = (state: CanvasState, targetIn: Array<number>, idx: number, newPosition: IPosition) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		return accessedPath.updateAnchor(idx, newPosition);
	});
};

export const changeType = (state: CanvasState, targetIn: Array<number>, idx: number, anchorType: AnchorType) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		const anchor = AnchorFactory.createAnchor(anchorType, <IinitDrawable>accessedPath.children.get(idx).toObject());
		return accessedPath.replaceAnchor(idx, anchor);
	});
};

export const updateBezierHandle = (state: CanvasState, targetIn: Array<number>, idx: number, newPosition: IPosition) => {
	return state.updateIn(['root', ...targetIn], (accessedPath: Path): Path => {
		const bezierAnchor = <QuadraticBezierAnchor>accessedPath.children.get(idx);
		if (typeof bezierAnchor === 'undefined') {
			console.error(`Anchor accessed by ${targetIn} with index ${idx} is not a Bezier Anchor`);
		} else {
			return accessedPath.replaceAnchor(idx, bezierAnchor.updateHandle(newPosition));
		}
	});
};
