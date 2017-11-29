import { List } from 'immutable';
import { IPosition } from '../canvas.model';
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
	idx: number;
	anchorType: AnchorType;
	transformStyle: string;

	constructor(params: IinitDrawable) {
		super({
			...params,
			type: DrawableType.Anchor,
		});
	}

	abstract setRouteParentPath: (path: List<number>) => BaseAnchor;

	abstract setPosition: (absPosition: IPosition) => BaseAnchor;

	abstract toPath: () => string;
}

export interface WithHandles {
	handleLines: Array<{ path: string, headTransformStyle: string }>;
	updateHandle: (absPosition: IPosition, which?: string) => WithHandles&BaseAnchor;
}
