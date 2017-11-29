import { List } from 'immutable';

import { IPosition, Position } from '../../canvas.model';
import { IinitDrawable } from '../../drawable/drawable.model';
import { AnchorType, BaseAnchor } from '../anchor.model';

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class QuadraticBezierAnchor extends BaseAnchor {
	anchorType: AnchorType;
	handlePosition: Position;

	constructor(params: IinitDrawable) {
		super(params);
		this.anchorType = AnchorType.QuadraticBezierCurve;
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

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class CubicBezierAnchor extends BaseAnchor {
	anchorType: AnchorType;
	handlePositions: { start: Position, end: Position };

	constructor(params: IinitDrawable) {
		super(params);
		this.anchorType = AnchorType.CubicBezierCurve;
		this.handlePositions = params.handlePositions || { start: this.absPosition, end: this.absPosition };
	}

	setRouteParentPath = (path: List<number>): CubicBezierAnchor => {
		return new CubicBezierAnchor({
			idx: this.idx,
			absPosition: this.absPosition,
			routeParentPath: path,
			handlePositions: this.handlePositions,
		});
	}

	setPosition = (absPosition: IPosition): CubicBezierAnchor => {
		return new CubicBezierAnchor({
			idx: this.idx,
			absPosition: new Position(absPosition),
			routeParentPath: this.routeParentPath,
			handlePositions: this.handlePositions,
		});
	}

	updateHandle = (absPosition: IPosition, which: 'start'|'end'|'both' = 'start') => {
		return new CubicBezierAnchor({
			idx: this.idx,
			absPosition: this.absPosition,
			routeParentPath: this.routeParentPath,
			handlePositions: {
				...this.handlePositions,
				[which === 'both' ? 'start' : which]: new Position(absPosition),
				[which === 'both' ? 'end' : which]: new Position(absPosition),
			},
		});
	}

	toTransform = (): string =>
	`translate(${this.absPosition.get('x')}px, ${this.absPosition.get('y')}px)`

	toPath = (): string =>
		`
		${this.anchorType}
		${this.handlePositions.start.get('x')}, ${this.handlePositions.start.get('y')}
		${this.handlePositions.end.get('x')}, ${this.handlePositions.end.get('y')}
		${this.absPosition.get('x')}, ${this.absPosition.get('y')}
		`
}
