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

	get transformStyle(): string {
		return `translate(${this.absPosition.get('x')}px, ${this.absPosition.get('y')}px)`;
	}

	toPath = (): string =>
		`${this.anchorType} ${this.absPosition.get('x')}, ${this.absPosition.get('y')}`
}
