import { IinitDrawable } from '../drawable/drawable.model';
import { AnchorType, BaseAnchor } from './anchor.model';
import { BasicAnchor } from './basic/basic.model';
import { QuadraticBezierAnchor } from './bezier/bezier.model';

export class AnchorFactory {
	static createAnchor = (type: AnchorType, params: IinitDrawable): BaseAnchor => {
		switch (type) {
			case AnchorType.LineTo:
				return new BasicAnchor(params);
			case AnchorType.QuadraticBezierCurve:
				return new QuadraticBezierAnchor(params);
			default:
				console.error('Invalid anchor type passed to AnchorFactory');
		}
	}
}
