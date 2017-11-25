import { List, Record } from 'immutable';
import { Position } from '../canvas.model';

export enum DrawableType {
	Anchor = 'DRAWABLE_ANCHOR',
	Path = 'DRAWABLE_PATH',
	Group = 'DRAWABLE_GROUP',
}

export interface IinitDrawable {
	idx: number;
	absPosition: Position;
	routeParentPath?: List<number>;
	type?: DrawableType;
	children?: List<Drawable>;
	[other: string]: any;
}

const initDrawableAttribute = {
	routeParentPath: List<number>([]),
	idx: 0,
	absPosition: new Position({ x: 0, y: 0 }),
	type: '',
};

export abstract class Drawable extends Record({ ...initDrawableAttribute, children: List<Drawable>([]) }) {
	children: List<Drawable>;
	routeParentPath: List<number>;
	idx: number;
	absPosition: Position;
	type: DrawableType;

	constructor(init: IinitDrawable) {
		super({
			...init,
			routeParentPath: init.routeParentPath ? init.routeParentPath : List<number>([]),
			children: init.children ? init.children : List<Drawable>([]),
		});
	}

	abstract setRouteParentPath: (parentPath: List<number>) => Drawable;
}
