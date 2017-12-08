import { List } from 'immutable';

import { IPosition, Position } from '../../canvas.model';
import { IinitDrawable } from '../../drawable/drawable.model';
import { AnchorType, AnchorWithHandles, BaseAnchor } from '../anchor.model';
import { BasicAnchor } from '../basic/basic.model';

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class SmoothAnchor extends BaseAnchor implements AnchorWithHandles {
	anchorType: AnchorType;
	handlePositions: List<Position>;

	constructor(params: IinitDrawable) {
		super(params);
		this.anchorType = AnchorType.SmoothCurveTo;
		this.handlePositions = params.handlePositions || List([this.absPosition]);
	}

	setRouteParentPath = (path: List<number>): SmoothAnchor => {
		return new SmoothAnchor({
			...this.toObject(),
			routeParentPath: path,
		});
	}

	public setIndex = (idx: number): SmoothAnchor => new SmoothAnchor({ ...this.toObject(), idx });

	setPosition = (absPosition: IPosition): SmoothAnchor => {
		return new SmoothAnchor({
			...this.toObject(),
			absPosition: new Position(absPosition),
		});
	}

	updateHandle = (absPosition: IPosition) => {
		return new SmoothAnchor({
			...this.toObject(),
			handlePositions: List([new Position(absPosition)]),
		});
	}

	clone = () => new SmoothAnchor(this.toObject());

	get transformStyle() {
		return `translate(${this.absPosition.x}px, ${this.absPosition.y}px)`;
	}

	get handleLines() {
		return [
			{
				path: `M${this.absPosition.x}, ${this.absPosition.y} L${this.handlePositions.get(0).x}, ${this.handlePositions.get(0).y}`,
				headTransformStyle: `translate(${this.handlePositions.get(0).x}px, ${this.handlePositions.get(0).y}px)`,
			},
			{
				path: `
				M${this.absPosition.x}, ${this.absPosition.y}
				L${(this.absPosition.x * 2) - this.handlePositions.get(0).x}, ${(this.absPosition.y * 2) - this.handlePositions.get(0).y}`,
				headTransformStyle: `
				translate(${(this.absPosition.x * 2) - this.handlePositions.get(0).x}px, ${(this.absPosition.y * 2) - this.handlePositions.get(0).y}px)
				`,
			},
		];
	}

	toPath = (): string =>
		`
		${this.anchorType}
		${this.handlePositions.get(0).x}, ${this.handlePositions.get(0).y}
		${this.absPosition.x}, ${this.absPosition.y}
		`
}

export class SmoothQuadraticAnchor extends BasicAnchor { // Component still more representable with basic
	constructor(params: IinitDrawable) {
		super({
			...params,
			anchorType: AnchorType.SmoothQuadraticBezierCurveTo,
		});
	}
}
