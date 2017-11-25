import { List, Record } from 'immutable';
import { Action } from 'redux';
import { Drawable } from './drawable/drawable.model';

export interface IPosition {
	x: number;
	y: number;
	z?: number;
}

export interface IRotation {
	x: number;
	y: number;
	z?: number;
}

export class Position extends Record({ x: 0, y: 0 }) {
	x: number;
	y: number;

	constructor(params: IPosition) {
		super(params);
	}
}

export class Position3D extends Record({ x: 0, y: 0, z: 0 }) {
	x: number;
	y: number;
	z: number;

	constructor(params: IPosition) {
		super(params);
	}
}

export class Quaternion extends Record({ x: 0, y: 0, z: 0 }) {
	x: number;
	y: number;
	z: number;

	constructor(params: IRotation) {
		super({
			...params,
			z: params.z ? params.z : 0,
		});
	}
}

export interface ISize {
	width: number;
	height: number;
}

export class Size extends Record({ width: 0, height: 0 }) {
	width: number;
	height: number;

	constructor(size: ISize) {
		super(size);
	}
}

export type ActionFromEvent = (event: Event, triggeringDrawable: Drawable, currentDrawable?: Drawable) => Action;

export interface RegisteredListener {
	name: string;
	handler: ActionFromEvent;
	target: 'anchor'|'path'|'curveHandle'|'group'|'canvas'|string;
}

export interface IBoard {
	topLeft: Position;
	scale: number;
	moved: Position;
	dimension: Size;
}

/**
 * IMPORTANT NOTE!
 *
 * DO NOT use 'size' because it is a reserved keyword in immutable (Record)
 * thus changing it to 'dimension'
 */
const initBoardAttributes: IBoard = {
	topLeft: new Position({ x: 0, y: 0 }),
	scale: 1,
	moved: new Position({ x: 0, y: 0 }),
	dimension: new Size({ width: 800, height: 600 }),
};

export class Board extends Record(initBoardAttributes) {
	constructor(initBoard: IBoard = initBoardAttributes) {
		super(initBoard);
	}
}

export interface ICanvasState {
	root: List<Drawable>;
	board: Board;
}

export class CanvasState extends Record({ root: List<Drawable>([]), board: new Board(initBoardAttributes) }) {
	constructor(initCanvas: ICanvasState) {
		super(initCanvas);
	}
}
