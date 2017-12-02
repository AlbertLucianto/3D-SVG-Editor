import { Record } from 'immutable';
import { IToolBase, ToolBase } from './tool/tool.model';

export enum ToolName {
	Pentool = 'PENTOOL',
	Selectiontool = 'SELECTIONTOOL',
	Canvastool = 'CANVASTOOL',
	DirectSelectiontool = 'DIRECTSELECTIONTOOL',
}

export class ToolboxState extends Record({ selected: {} }) {
	selected: ToolBase;

	constructor(initState: {
		selected: IToolBase,
	}) {
		super(initState);
	}
}
