import { List } from 'immutable';

import { IPosition, Position } from '../../canvas.model';
import { IinitDrawable } from '../../drawable/drawable.model';
import { AnchorType, BaseAnchor } from '../anchor.model';

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class BasicAnchor extends BaseAnchor {
	constructor(params: IinitDrawable) {
		super(params);
		switch (true) {
			case this.idx === 0:
				this.anchorType = AnchorType.MoveTo;
				break;
			case !!params.anchorType:
				this.anchorType = params.anchorType;
				break;
			default:
				this.anchorType = AnchorType.LineTo;
		}
	}

	setRouteParentPath = (path: List<number>): BasicAnchor => {
		return new BasicAnchor({
			idx: this.idx,
			routeParentPath: path,
			absPosition: this.absPosition,
			anchorType: this.anchorType,
		});
	}

	setPosition = (absPosition: IPosition): BasicAnchor => {
		return new BasicAnchor({
			idx: this.idx,
			routeParentPath: this.routeParentPath,
			absPosition: new Position(absPosition),
			anchorType: this.anchorType,
		});
	}

	toTransform = (): string =>
		`translate(${this.absPosition.get('x')}px, ${this.absPosition.get('y')}px)`

	toPath = (): string =>
		`${this.anchorType} ${this.absPosition.get('x')}, ${this.absPosition.get('y')}`
}

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class SmoothAnchor extends BaseAnchor {
	anchorType: AnchorType;
	handlePosition: Position;

	constructor(params: IinitDrawable) {
		super(params);
		this.anchorType = AnchorType.SmoothCurveTo;
		this.handlePosition = params.handlePosition || this.absPosition;
	}

	setRouteParentPath = (path: List<number>): SmoothAnchor => {
		return new SmoothAnchor({
			idx: this.idx,
			absPosition: this.absPosition,
			routeParentPath: path,
			handlePosition: this.handlePosition,
		});
	}

	setPosition = (absPosition: IPosition): SmoothAnchor => {
		return new SmoothAnchor({
			idx: this.idx,
			routeParentPath: this.routeParentPath,
			absPosition: new Position(absPosition),
			handlePosition: this.handlePosition,
		});
	}

	updateHandle = (absPosition: IPosition) => {
		return new SmoothAnchor({
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
