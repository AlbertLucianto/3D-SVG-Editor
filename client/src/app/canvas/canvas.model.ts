import { List, Record, Stack } from 'immutable';
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

export class Position extends Record({ x: 0, y: 0, z: 0 }) {
	x: number;
	y: number;
	z?: number;

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

export interface IActionFromEventPayload {
	targetIn?: Array<number>;
	currentTargetIn?: Array<number>;
	triggeringDrawable?: Drawable;
	currentTriggeringDrawable?: Drawable;
}

export type ActionFromEvent = (event: Event, payload?: IActionFromEventPayload) => Action;

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

export class Board extends Record(initBoardAttributes) implements IBoard {
	topLeft: Position;
	scale: number;
	moved: Position;
	dimension: Size;

	constructor(initBoard: IBoard = initBoardAttributes) {
		super(initBoard);
	}
}

export interface ICanvasState {
	root: List<Drawable>;
	board: Board;
	/**
	 * List of paths from root
	 */
	selected: List<List<number>>;
	isolate: List<number>;
	history?: Stack<List<Drawable>>;
}

const initCanvasState: ICanvasState = {
	root: List<Drawable>([]),
	board: new Board(initBoardAttributes),
	selected: List<List<number>>([]),
	isolate: List<number>([]),
	history: Stack.of<List<Drawable>>(List<Drawable>([])),
};

export class CanvasState extends Record(initCanvasState) implements ICanvasState {
	root: List<Drawable>;
	board: Board;
	selected: List<List<number>>;
	isolate: List<number>;
	history: Stack<List<Drawable>>;

	constructor(initCanvas: ICanvasState) {
		super(initCanvas);
	}
}
