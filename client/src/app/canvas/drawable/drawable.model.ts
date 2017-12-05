import { List, Record } from 'immutable';
import { Position } from '../canvas.model';

export enum DrawableType {
	Anchor = 'DRAWABLE_ANCHOR',
	Path = 'DRAWABLE_PATH',
	Group = 'DRAWABLE_GROUP',
}

export interface IinitDrawable {
	id?: number;
	idx: number;
	absPosition: Position;
	routeParentPath?: List<number>;
	type?: DrawableType;
	children?: List<Drawable>;
	[other: string]: any;
}

const initDrawableAttribute = {
	id: 0,
	idx: 0,
	absPosition: new Position({ x: 0, y: 0 }),
	routeParentPath: List<number>([]),
	type: '',
	children: List<Drawable>([]),
};

export abstract class Drawable extends Record(initDrawableAttribute) {
	private static lastId = 1;
	id: number;
	children: List<Drawable>;
	routeParentPath: List<number>;
	idx: number;
	absPosition: Position;
	type: DrawableType;

	constructor(init: IinitDrawable) {
		super({
			...init,
			id: init.id || Drawable.genId(),
			routeParentPath: init.routeParentPath || List<number>([]),
			children: init.children || List<Drawable>([]),
		});
	}

	abstract setRouteParentPath: (parentPath: List<number>) => Drawable;

	/**
	 * Converting from Array<number> usually used in `targetIn` to be merged alternately with 'children' string
	 * Used for accessing immutable data using methods `getIn`, `setIn`, etc.
	 */
	static toRoutePath = (targetIn: Array<number>, accessLastChildren: boolean = false): Array<number|'children'> =>
		targetIn.reduce<Array<number|'children'>>((acc, target, idx) =>
			accessLastChildren || idx !== targetIn.length - 1 ?
			[...acc, target, 'children'] : [...acc, target],
			[])

	static genId = (): number => {
		return Drawable.lastId++;
	}
}
