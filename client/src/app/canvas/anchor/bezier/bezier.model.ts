import { List } from 'immutable';

import { IPosition, Position } from '../../canvas.model';
import { IinitDrawable } from '../../drawable/drawable.model';
import { AnchorType, BaseAnchor } from '../anchor.model';

export class QuadraticBezierAnchor extends BaseAnchor {
	anchorType = AnchorType.QuadraticBezierCurve;
	handlePosition: Position;

	constructor(params: IinitDrawable) {
		super(params);
		this.handlePosition = this.absPosition;
	}

	setRouteParentPath = (path: List<number>): QuadraticBezierAnchor => {
		return new QuadraticBezierAnchor({
			idx: this.idx,
			routeParentPath: path,
			absPosition: this.absPosition,
		});
	}

	setPosition = (absPosition: IPosition): QuadraticBezierAnchor => {
		return new QuadraticBezierAnchor({
			idx: this.idx,
			routeParentPath: this.routeParentPath,
			absPosition: new Position(absPosition),
		});
	}

	updateHandle = (absPosition: IPosition) => {
		return new QuadraticBezierAnchor({
			...<IinitDrawable>this.toObject(),
			handlePosition: new Position(absPosition),
		});
	}

	toTransform = (): string =>
		`translate(${this.absPosition.get('x')}px, ${this.absPosition.get('y')}px)`

	toPath = (): string =>
		`
		${this.anchorType}
		${this.handlePosition.get('x')}, ${this.handlePosition.get('y')}
		${this.absPosition.get('x')}, ${this.absPosition.get('y')}
		`
}
