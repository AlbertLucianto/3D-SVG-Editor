import { Injectable } from '@angular/core';

import { CanvastoolEpics } from './canvastool/canvastool.epics';
import { PentoolEpics } from './pentool/pentool.epics';
import { SelectiontoolEpics } from './selectiontool/selectiontool.epics';

@Injectable()
export class ToolboxEpics {
	constructor(
		private pentoolEpics: PentoolEpics,
		private selectiontoolEpics: SelectiontoolEpics,
		private canvastoolEpics: CanvastoolEpics) { }

	public createEpics() {
		return [
			// createEpicMiddleware(this.createCoreToolboxEpic()),
			...this.pentoolEpics.createEpics(),
			...this.selectiontoolEpics.createEpics(),
			...this.canvastoolEpics.createEpics(),
		];
	}
}
