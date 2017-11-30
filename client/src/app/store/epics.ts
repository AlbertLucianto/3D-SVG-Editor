import { Injectable } from '@angular/core';

import { CanvasEpics } from '../canvas/canvas.epics';
import { ColorPickerEpics } from '../color/color.epics';
import { ToolboxEpics } from '../toolbox/toolbox.epics';

@Injectable()
export class RootEpics {
	constructor(
		private toolboxEpics: ToolboxEpics,
		private canvasEpics: CanvasEpics,
		private colorPickerEpics: ColorPickerEpics) { }

	public createEpics() {
		return [
			...this.toolboxEpics.createEpics(),
			...this.canvasEpics.createEpics(),
			...this.colorPickerEpics.createEpics(),
		];
	}
}
