import { Record } from 'immutable';

import { Color } from './rim.color.model';

export { Color };

export enum ColorAttribute {
	Fill = 'fill',
	Outline = 'outline',
}

export interface IFill {
	color: Color;
	opacity: number;
}

export interface IOutline {
	color: Color;
	opacity: number;
	width: number;
}

const initFill: IFill = { color: new Color(), opacity: 1 };

export class Fill extends Record(initFill) {
	color: Color;
	opacity: number;

	constructor(state: IFill = initFill) {
		super(state);
	}
}

const initOutline: IOutline = { color: new Color(), width: 1, opacity: 1 };

export class Outline extends Record(initOutline) {
	color: Color;
	width: number;
	opacity: number;

	constructor(state: IOutline = initOutline) {
		super(state);
	}
}

export interface IRimState {
	fill: Fill;
	outline: Outline;
}

const initRimState: IRimState = { fill: new Fill(), outline: new Outline() };

export class RimState extends Record(initRimState) {
	fill: Fill; // attribute naming must be same with ColorAttribute enum
	outline: Outline;

	constructor(state: IRimState = initRimState) {
		super(state);
	}
}
