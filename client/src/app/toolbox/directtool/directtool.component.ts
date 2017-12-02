import { dispatch } from '@angular-redux/store';
import { AfterContentChecked, Component } from '@angular/core';

import { ToolBaseComponent } from '../tool/tool.base.component';
import { ToolboxActions } from '../toolbox.action';

@Component({
	selector: 'app-directtool',
	templateUrl: './directtool.component.html',
	styleUrls: ['./directtool.component.scss'],
})
export class DirectSelectiontoolComponent extends ToolBaseComponent implements AfterContentChecked {
	constructor(
		private toolboxActions: ToolboxActions) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = 'url(assets/img/cursor/direct_cursor.svg) 10 9, default';
	}

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
