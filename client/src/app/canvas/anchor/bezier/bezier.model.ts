import { List } from 'immutable';

import { IPosition, Position } from '../../canvas.model';
import { IinitDrawable } from '../../drawable/drawable.model';
import { AnchorType, AnchorWithHandles, BaseAnchor } from '../anchor.model';

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class QuadraticBezierAnchor extends BaseAnchor implements AnchorWithHandles {
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

	get transformStyle(): string {
		return`translate(${this.absPosition.x}px, ${this.absPosition.y}px)`;
	}

	get handleLines() {
		return [];
	}

	toPath = (): string =>
		`
		${this.anchorType}
		${this.handlePosition.x}, ${this.handlePosition.y}
		${this.absPosition.x}, ${this.absPosition.y}
		`
}

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class CubicBezierAnchor extends BaseAnchor implements AnchorWithHandles {
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
		const position = new Position(absPosition);
		return new CubicBezierAnchor({
			idx: this.idx,
			absPosition: this.absPosition,
			routeParentPath: this.routeParentPath,
			handlePositions: {
				...this.handlePositions,
				[which === 'both' ? 'start' : which]: position,
				[which === 'both' ? 'end' : which]: position,
			},
		});
	}

	get transformStyle() {
		return `translate(${this.absPosition.x}px, ${this.absPosition.y}px)`;
	}

	get handleLines() {
		return [];
	}

	toPath = (): string =>
		`
		${this.anchorType}
		${this.handlePositions.start.x}, ${this.handlePositions.start.y}
		${this.handlePositions.end.x}, ${this.handlePositions.end.y}
		${this.absPosition.x}, ${this.absPosition.y}
		`
}
