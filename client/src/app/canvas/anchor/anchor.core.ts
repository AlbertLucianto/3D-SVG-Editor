import { CanvasState, IPosition } from '../canvas.model';
import { Drawable, IinitDrawable } from '../drawable/drawable.model';
import { Path } from '../path/path.model';
import { AnchorFactory } from './anchor.factory';
import { AnchorType, BaseAnchor } from './anchor.model';
import { CubicBezierAnchor, QuadraticBezierAnchor } from './bezier/bezier.model';

export const updatePosition = (state: CanvasState, targetIn: Array<number>, idx: number, newPosition: IPosition) => {
	return state.updateIn(Drawable.toRoutePath(targetIn), (accessedPath: Path): Path => {
		return accessedPath.updateAnchor(idx, newPosition);
	});
};

export const changeType = (state: CanvasState, targetIn: Array<number>, idx: number, anchorType: AnchorType) => {
	return state.updateIn(Drawable.toRoutePath(targetIn), (accessedPath: Path): Path => {
		const anchor = AnchorFactory.createAnchor(anchorType, <IinitDrawable>accessedPath.children.get(idx).toObject());
		return accessedPath.replaceAnchor(idx, anchor);
	});
};

export const updateBezierHandle = (state: CanvasState, targetIn: Array<number>, idx: number,
	newPosition: IPosition, which: 'start'|'end'|'both' = 'start') => {
	return state.updateIn(Drawable.toRoutePath(targetIn), (accessedPath: Path): Path => {
		const anchor = (<BaseAnchor>accessedPath.children.get(idx));
		switch (anchor.anchorType) {
			case AnchorType.QuadraticBezierCurve:
				return accessedPath.replaceAnchor(idx, (<QuadraticBezierAnchor>anchor).updateHandle(newPosition));
			case AnchorType.CubicBezierCurve:
				return accessedPath.replaceAnchor(idx, (<CubicBezierAnchor>anchor).updateHandle(newPosition, which));
			case AnchorType.SmoothCurveTo:
				return accessedPath.replaceAnchor(idx, (<QuadraticBezierAnchor>anchor).updateHandle(newPosition));
			default:
				console.error(`Anchor accessed by ${targetIn} with index ${idx} is not a Bezier Anchor`);
		}
	});
};
