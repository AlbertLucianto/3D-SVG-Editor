import { List } from 'immutable';

import { IPosition, Position } from '../../canvas.model';
import { IinitDrawable } from '../../drawable/drawable.model';
import { AnchorType, BaseAnchor } from '../anchor.model';

export class QuadraticBezierAnchor extends BaseAnchor {
	anchorType: AnchorType;
	handlePosition: Position;

	constructor(params: IinitDrawable) {
		super(params);
		this.anchorType = AnchorType.QuadraticBezierCurve;
		// console.log('hell yeah', params.handlePosition);
		this.handlePosition = params.handlePosition || this.absPosition;
	}

	setRouteParentPath = (path: List<number>): QuadraticBezierAnchor => {
		return new QuadraticBezierAnchor({
			idx: this.idx,
			routeParentPath: path,
			absPosition: this.absPosition,
			handlePosition: this.handlePosition,
		});
	}

	setPosition = (absPosition: IPosition): QuadraticBezierAnchor => {
		return new QuadraticBezierAnchor({
			idx: this.idx,
			routeParentPath: this.routeParentPath,
			absPosition: new Position(absPosition),
			handlePosition: this.handlePosition,
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
