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
	handlePositions: List<Position>;

	constructor(params: IinitDrawable) {
		super(params);
		this.anchorType = AnchorType.QuadraticBezierCurve;
		this.handlePositions = params.handlePositions || List([this.absPosition]);
	}

	setRouteParentPath = (path: List<number>): QuadraticBezierAnchor => {
		return new QuadraticBezierAnchor({
			...(this.toObject()),
			routeParentPath: path,
		});
	}

	public setIndex = (idx: number): QuadraticBezierAnchor => new QuadraticBezierAnchor({ ...this.toObject(), idx });

	public updatePosition = (projection: (curPos: IPosition) => IPosition) => {
		return new QuadraticBezierAnchor({
			...this.updateHandle(projection(this.handlePositions.get(0))).toObject(),
			absPosition: new Position(projection(this.absPosition)),
		});
	}

	setPosition = (absPosition: IPosition): QuadraticBezierAnchor => {
		return new QuadraticBezierAnchor({
			...(this.toObject()),
			absPosition: new Position(absPosition),
		});
	}

	updateHandle = (absPosition: IPosition) => {
		return new QuadraticBezierAnchor({
			...(this.toObject()),
			handlePositions: List([new Position(absPosition)]),
		});
	}

	clone = () => new QuadraticBezierAnchor(this.toObject());

	toObject() {
		return ({
			...BaseAnchor.prototype.toObject.call(this),
			handlePositions: this.handlePositions,
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
		${this.handlePositions.get(0).x}, ${this.handlePositions.get(0).y}
		${this.absPosition.x}, ${this.absPosition.y}
		`
}

/**
 * It might be better to use composition rather than inheritance
 * However, it will be more difficult to make use of Immutable methods
 */
export class CubicBezierAnchor extends BaseAnchor implements AnchorWithHandles {
	anchorType: AnchorType;
	handlePositions: List<Position>;

	constructor(params: IinitDrawable) {
		super(params);
		this.anchorType = AnchorType.CubicBezierCurve;
		this.handlePositions = params.handlePositions || List([this.absPosition, this.absPosition]);
	}

	setRouteParentPath = (path: List<number>): CubicBezierAnchor => {
		return new CubicBezierAnchor({
			...this.toObject(),
			routeParentPath: path,
		});
	}

	public setIndex = (idx: number): CubicBezierAnchor => new CubicBezierAnchor({ ...this.toObject(), idx });

	public updatePosition = (projection: (curPos: IPosition) => IPosition) => {
		return new CubicBezierAnchor({
			...this
				.updateHandle(projection(this.handlePositions.get(0)), 'start')
				.updateHandle(projection(this.handlePositions.get(1)), 'end')
				.toObject(),
			absPosition: new Position(projection(this.absPosition)),
		});
	}

	setPosition = (absPosition: IPosition): CubicBezierAnchor => {
		return new CubicBezierAnchor({
			...this.toObject(),
			absPosition: new Position(absPosition),
		});
	}

	updateHandle = (absPosition: IPosition, which: 'start'|'end'|'both' = 'start') => {
		const position = new Position(absPosition);
		const whichIdx = ({ start: 0, end: 1, both: 2 })[which];
		return new CubicBezierAnchor({
			...this.toObject(),
			handlePositions: this.handlePositions
				.set(whichIdx === 2 ? 0 : whichIdx, position)
				.set(whichIdx === 2 ? 1 : whichIdx, position),
		});
	}

	clone = () => new CubicBezierAnchor(this.toObject());

	get transformStyle() {
		return `translate(${this.absPosition.x}px, ${this.absPosition.y}px)`;
	}

	get handleLines() {
		return [
			{
				path: `
				M${this.absPosition.x}, ${this.absPosition.y}
				L${this.handlePositions.get(1).x}, ${this.handlePositions.get(1).y}
				`,
				headTransformStyle: `
				translate(${this.handlePositions.get(1).x}px, ${this.handlePositions.get(1).y}px)`,
			},
			{
				path: `
				M${this.absPosition.x}, ${this.absPosition.y}
				L${(this.absPosition.x * 2) - this.handlePositions.get(1).x}, ${(this.absPosition.y * 2) - this.handlePositions.get(1).y}
				`,
				headTransformStyle: `
				translate(
				${(this.absPosition.x * 2) - this.handlePositions.get(1).x}px,
				${(this.absPosition.y * 2) - this.handlePositions.get(1).y}px)`,
			},
		];
	}

	toPath = (): string =>
		`
		${this.anchorType}
		${this.handlePositions.get(0).x}, ${this.handlePositions.get(0).y}
		${this.handlePositions.get(1).x}, ${this.handlePositions.get(1).y}
		${this.absPosition.x}, ${this.absPosition.y}
		`
}
