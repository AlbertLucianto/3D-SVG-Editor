import { Injectable } from '@angular/core';

import { CanvastoolEpics } from './canvastool/canvastool.epics';
import { DirectSelectiontoolEpics } from './directtool/directtool.epics';
import { PentoolEpics } from './pentool/epics/pentool.epics';
import { RotatetoolEpics } from './rotatetool/rotatetool.epics';
import { SelectiontoolEpics } from './selectiontool/selectiontool.epics';

@Injectable()
export class ToolboxEpics {
	constructor(
		private pentoolEpics: PentoolEpics,
		private selectiontoolEpics: SelectiontoolEpics,
		private canvastoolEpics: CanvastoolEpics,
		private directSelectiontoolEpics: DirectSelectiontoolEpics,
		private rotatetoolEpics: RotatetoolEpics) { }

	public createEpics() {
		return [
			...this.pentoolEpics.createEpics(),
			...this.selectiontoolEpics.createEpics(),
			...this.canvastoolEpics.createEpics(),
			...this.directSelectiontoolEpics.createEpics(),
			...this.rotatetoolEpics.createEpics(),
		];
	}
}
