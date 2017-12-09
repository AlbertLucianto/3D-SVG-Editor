import { List } from 'immutable';

import { ColorAttribute } from '../../color/rim/rim.model';
import { AnchorFactory } from '../anchor/anchor.factory';
import { AnchorType, BaseAnchor } from '../anchor/anchor.model';
import { IPosition, Position } from '../canvas.model';
import { Drawable, DrawableType, IinitDrawable } from '../drawable/drawable.model';

export interface IinitPath extends IinitDrawable {
	isZipped?: boolean;
	children?: List<BaseAnchor>;
	fill?: string;
	outline?: string;
}

export class Path extends Drawable {
	children: List<BaseAnchor>;
	idx: number;
	isZipped: boolean;
	fill: string;
	outline: string;

	constructor(params: IinitPath) {
		super({
			...params,
			type: DrawableType.Path,
		});
		this.isZipped = !!params.isZipped;
		this.fill = params.fill || '#000';
		this.outline = params.outline || '#000';
	}

	public setRouteParentPath = (path: List<number>): Path => {
		return new Path({
			...(<IinitPath>this.toObject()),
			children: <List<BaseAnchor>>this.children.map(child => child.setRouteParentPath(path.push(this.idx))),
			routeParentPath: path,
		});
	}

	public setIndex = (idx: number): Path => new Path({ ...this.toObject(), idx });

	public updatePosition = (projection: (curPos: IPosition) => IPosition) => {
		return new Path({
			...(<IinitPath>this.toObject()),
			children: <List<BaseAnchor>>this.children.map(child => child.updatePosition(projection)),
		});
	}

	public toPath = (): string =>
		this.children.reduce((acc, anchor) => `${acc} ${anchor.toPath()}`, '').concat(this.isZipped ? ' z' : '')

	public toColorStyle = (): { [key: string]: string } => ({
		fill: this.fill, // Later change to toRGBAString when Opacity finished
		stroke: this.outline,
	})

	/**
	 * Problem with immutable by adding methods which returns its own type
	 * since Immutable (Record) return type is a <K,V> pairs and cannot hold method
	 * defined in the subclasses
	 *
	 * Push an anchor and return NEW Path (old path is not mutated)
	 * @param { Position } absPosition - object containing x, y, and optional z
	 */
	public addAnchor = (absPosition: Position|IPosition, anchorType: AnchorType = AnchorType.LineTo): Path => {
		let position = absPosition;
		if (!(absPosition instanceof Position)) {
			position = new Position(absPosition);
		}
		return new Path({
			...(<IinitPath>this.toObject()),
			children: this.children.push(AnchorFactory.createAnchor(
				anchorType,
				{
					absPosition: <Position>position,
					routeParentPath: this.routeParentPath.push(this.idx),
					idx: this.children.size,
				},
			)),
		});
	}

	public replaceAnchor = (idx: number, newAnchor: BaseAnchor): Path => {
		const children = this.children.set(
			idx, newAnchor.setRouteParentPath(this.routeParentPath.push(idx)),
		);
		return new Path({
			...(<IinitPath>this.toObject()),
			children,
		});
	}

	public updateAnchor = (idx: number, newPosition: IPosition): Path => {
		const children = this.children.update(idx, (child: BaseAnchor) => child.setPosition(newPosition));
		return new Path({
			...(<IinitPath>this.toObject()),
			children,
		});
	}

	public removeAnchor = (idx: number): Path => {
		const children = this.children.remove(idx);
		return new Path({
			...(<IinitPath>this.toObject()),
			children,
		});
	}

	public removeLastAnchor = (): Path => {
		return this.removeAnchor(this.children.size - 1);
	}

	public zip = (): Path => {
		return new Path({
			...(<IinitPath>this.toObject()),
			isZipped: true,
		});
	}

	public setColor = (attribute: ColorAttribute, color: string): Path =>
		new Path({
			...(<IinitPath>this.toObject()),
			[attribute]: color,
		})

	public toObject() {
		return <IinitPath>({
			...Drawable.prototype.toObject.call(this),
			...(<IinitPath>this),
		});
	}
}
