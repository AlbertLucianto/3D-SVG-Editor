import { List } from 'immutable';

import { IPosition, Position } from '../../canvas.model';
import { IinitDrawable } from '../../drawable/drawable.model';
import { AnchorType, BaseAnchor, WithHandles } from '../anchor.model';

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class SmoothAnchor extends BaseAnchor implements WithHandles {
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

	get transformStyle() {
		return `translate(${this.absPosition.x}px, ${this.absPosition.y}px)`;
	}

	get handleLines() {
		return [
			{
				path: `M${this.absPosition.x}, ${this.absPosition.y} L${this.handlePosition.x}, ${this.handlePosition.y}`,
				headTransformStyle: `translate(${this.handlePosition.x}px, ${this.handlePosition.y}px)`,
			},
		];
	}

	toPath = (): string =>
		`
		${this.anchorType}
		${this.handlePosition.x}, ${this.handlePosition.y}
		${this.absPosition.x}, ${this.absPosition.y}
		`
}
