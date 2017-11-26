import { List } from 'immutable';

import { IPosition, Position } from '../../canvas.model';
import { IinitDrawable } from '../../drawable/drawable.model';
import { AnchorType, BaseAnchor } from '../anchor.model';

export class BasicAnchor extends BaseAnchor {
	constructor(params: IinitDrawable) {
		super(params);
		this.anchorType = this.idx === 0 ? AnchorType.MoveTo : AnchorType.LineTo;
	}

	setRouteParentPath = (path: List<number>): BasicAnchor => {
		return new BasicAnchor({
			idx: this.idx,
			routeParentPath: path,
			absPosition: this.absPosition,
		});
	}

	setPosition = (absPosition: IPosition): BasicAnchor => {
		return new BasicAnchor({
			idx: this.idx,
			routeParentPath: this.routeParentPath,
			absPosition: new Position(absPosition),
		});
	}

	toTransform = (): string =>
		`translate(${this.absPosition.get('x')}px, ${this.absPosition.get('y')}px)`

	toPath = (): string =>
		`${this.anchorType} ${this.absPosition.get('x')}, ${this.absPosition.get('y')}`
}
