import { Injectable } from '@angular/core';

import { CanvasEpics } from '../canvas/canvas.epics';
import { ToolboxEpics } from '../toolbox/toolbox.epics';

@Injectable()
export class RootEpics {
	constructor(
		private toolboxEpics: ToolboxEpics,
		private canvasEpics: CanvasEpics) { }

	public createEpics() {
		return [
			...this.toolboxEpics.createEpics(),
			...this.canvasEpics.createEpics(),
		];
	}
}
