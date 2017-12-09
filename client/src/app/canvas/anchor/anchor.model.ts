import { List } from 'immutable';
import { IPosition, Position } from '../canvas.model';
import { Drawable, DrawableType, IinitDrawable } from '../drawable/drawable.model';

export enum AnchorType {
	MoveTo = 'M',
	LineTo = 'L',
	HorizontalLineTo = 'H',
	VerticalLineTo = 'V',
	CubicBezierCurve = 'C',
	SmoothCurveTo = 'S',
	QuadraticBezierCurve = 'Q',
	SmoothQuadraticBezierCurveTo = 'T',
	ElipticalArc = 'A',
	ClosePath = 'Z',
}

export abstract class BaseAnchor extends Drawable {
	anchorType: AnchorType;

	constructor(params: IinitDrawable) {
		super({
			...params,
			type: DrawableType.Anchor,
		});
	}

	abstract transformStyle: string;
	abstract setRouteParentPath: (path: List<number>) => BaseAnchor;
	abstract setPosition: (absPosition: IPosition) => BaseAnchor;
	abstract toPath: () => string;
	abstract clone: () => BaseAnchor;
}

export interface IHandle { path: string; headTransformStyle: string; }

export interface AnchorWithHandles extends BaseAnchor {
	handlePositions: List<Position>;
	handleLines: Array<IHandle>;
	updateHandle: (absPosition: IPosition, which?: string) => AnchorWithHandles;
}
