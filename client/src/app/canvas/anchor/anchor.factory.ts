import { IinitDrawable } from '../drawable/drawable.model';
import { AnchorType, BaseAnchor } from './anchor.model';
import { BasicAnchor } from './basic/basic.model';
import { CubicBezierAnchor, QuadraticBezierAnchor } from './bezier/bezier.model';
import { SmoothAnchor, SmoothQuadraticAnchor } from './smooth/smooth.model';

export class AnchorFactory {
	static createAnchor = (type: AnchorType, params: IinitDrawable): BaseAnchor => {
		switch (type) {
			case AnchorType.LineTo:
				return new BasicAnchor(params);
			case AnchorType.SmoothCurveTo:
				return new SmoothAnchor(params);
			case AnchorType.QuadraticBezierCurve:
				return new QuadraticBezierAnchor(params);
			case AnchorType.CubicBezierCurve:
				return new CubicBezierAnchor(params);
			case AnchorType.SmoothQuadraticBezierCurveTo:
				return new SmoothQuadraticAnchor(params);
			default:
				console.error('Invalid anchor type passed to AnchorFactory');
		}
	}
}
