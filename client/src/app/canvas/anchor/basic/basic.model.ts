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
		this.anchorType = this.idx === 0 ? this.anchorType = AnchorType.MoveTo : AnchorType.LineTo;
	}

	setRouteParentPath = (path: List<number>): BasicAnchor => {
		return new BasicAnchor({
			...this.toObject(),
			routeParentPath: path,
		});
	}

	setPosition = (absPosition: IPosition): BasicAnchor => {
		return new BasicAnchor({
			...this.toObject(),
			absPosition: new Position(absPosition),
		});
	}

	clone = () => new BasicAnchor(this.toObject());

	get transformStyle(): string {
		return `translate(${this.absPosition.get('x')}px, ${this.absPosition.get('y')}px)`;
	}

	toPath = (): string =>
		`${this.anchorType} ${this.absPosition.get('x')}, ${this.absPosition.get('y')}`
}
