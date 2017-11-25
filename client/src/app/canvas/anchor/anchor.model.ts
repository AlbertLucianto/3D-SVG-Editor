import { List } from 'immutable';
import { IPosition, Position } from '../canvas.model';
import { Drawable, DrawableType, IinitDrawable } from '../drawable/drawable.model';

export enum AnchorType {
	MoveTo = 'M',
	LineTo = 'L',
	HorizontalLineTo = 'H',
	VerticalLineTo = 'V',
	CurveTo = 'C',
	SmoothCurveTo = 'S',
	QuadraticBezierCurve = 'Q',
	SmoothQuadraticBezierCurveTo = 'T',
	ElipticalArc = 'A',
	ClosePath = 'Z',
}

export class BaseAnchor extends Drawable {
	idx: number;
	anchorType: AnchorType;

	constructor(params: IinitDrawable) {
		super({
			...params,
			type: DrawableType.Anchor,
		});
		this.anchorType = this.idx === 0 ? AnchorType.MoveTo : AnchorType.LineTo;
	}

	setRouteParentPath = (path: List<number>): BaseAnchor => {
		return new BaseAnchor({
			idx: this.idx,
			routeParentPath: path,
			absPosition: this.absPosition,
		});
	}

	setPosition = (absPosition: IPosition): BaseAnchor => {
		return new BaseAnchor({
			idx: this.idx,
			routeParentPath: this.routeParentPath,
			absPosition: new Position(absPosition),
		});
	}

	toTransform = (): string =>
		`translate(${this.absPosition.get('x')}px, ${this.absPosition.get('y')}px)`

	toPath = (): string =>
		`${this.anchorType} ${this.absPosition.get('x')} ${this.absPosition.get('y')}`
}
