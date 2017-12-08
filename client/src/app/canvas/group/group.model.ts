import { List } from 'immutable';
import { Position } from '../canvas.model';
import { Drawable, DrawableType, IinitDrawable } from '../drawable/drawable.model';
import { Path } from '../path/path.model';

export interface IinitGroup extends IinitDrawable {
	children?: List<Group|Path>;
}

export class Group extends Drawable {
	children: List<Group|Path>;

	constructor(params: IinitDrawable) {
		super({
			...params,
			type: DrawableType.Group,
		});
	}

	setRouteParentPath = (path: List<number>): Group => {
		return new Group({
			...(<IinitGroup>this.toObject()),
			routeParentPath: path,
			children: <List<Group|Path>>this.children.map(child => child.setRouteParentPath(path.push(this.idx))),
		});
	}

	public setIndex = (idx: number): Group => new Group({ ...this.toObject(), idx });

	/**
	 * * Problem with immutable by adding methods which returns its own type
	 * since Immutable (Record) return type is a <K,V> pairs and cannot hold method
	 * defined in the subclasses
	 *
	 * Push an anchor and return NEW Path (old path is not mutated)
	 * @param {{type: DrawableType, absPosition: Position }|Path|Group} drawable - drawable parameters
	 * @param {number} idx - inserted on index
	 */
	addChild = (drawable: { type: DrawableType, absPosition: Position }|Path|Group, idx: number): Group => {
		const child = <Path|Group>drawable;
		if (typeof child !== 'undefined') {
			return new Group({
				...(<IinitGroup>this),
				children: this.children.insert(idx, child.setRouteParentPath(this.routeParentPath.push(idx))),
			});
		}
		return <Group>this.update( // Pretty sure will be error, fix later!
			'children',
			(children: List<Group|Path>): List<Group|Path> => {
				const init = {
					absPosition: drawable.absPosition,
					routeParentPath: this.routeParentPath,
					idx,
				};
				switch (drawable.type) {
					case DrawableType.Group:
						return children.insert(idx, new Group(init));
					case DrawableType.Path:
						return children.insert(idx, new Path(init));
					default:
						console.error('Invalid child inserted');
						return children;
				}
			},
		);
	}
}
