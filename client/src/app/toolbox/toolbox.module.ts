import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CanvastoolComponent } from './canvastool/canvastool.component';
import { CanvastoolEpics } from './canvastool/canvastool.epics';
import { DirectSelectiontoolComponent } from './directtool/directtool.component';
import { DirectSelectiontoolEpics } from './directtool/directtool.epics';
import { PentoolDrawEpics } from './pentool/epics/pentool.draw.epics';
import { PentoolEpics } from './pentool/epics/pentool.epics';
import { PentoolActions } from './pentool/pentool.action';
import { PentoolComponent } from './pentool/pentool.component';
import { SelectiontoolActions } from './selectiontool/selectiontool.action';
import { SelectiontoolComponent } from './selectiontool/selectiontool.component';
import { SelectiontoolEpics } from './selectiontool/selectiontool.epics';
import { ToolContainerComponent } from './tool/tool.container.component';
import { ToolDirective } from './tool/tool.directive';
import { ToolboxActions } from './toolbox.action';
import { ToolboxComponent } from './toolbox.component';
import { ToolboxEpics } from './toolbox.epics';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		ToolboxComponent,
		ToolContainerComponent,
		PentoolComponent,
		SelectiontoolComponent,
		ToolDirective,
		CanvastoolComponent,
		DirectSelectiontoolComponent,
	],
	entryComponents: [
		PentoolComponent,
		SelectiontoolComponent,
		CanvastoolComponent,
		DirectSelectiontoolComponent,
	],
	providers: [
		CanvastoolEpics,
		ToolboxActions,
		ToolboxEpics,
		PentoolActions,
		PentoolEpics,
		PentoolDrawEpics,
		SelectiontoolEpics,
		SelectiontoolActions,
		DirectSelectiontoolEpics,
	],
	exports: [
		ToolboxComponent,
	],
})
export class ToolboxModule { }
