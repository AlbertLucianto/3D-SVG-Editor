import { dispatch } from '@angular-redux/store';
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';

import { ToolBaseComponent } from '../tool/tool.base.component';
import { ToolboxActions } from '../toolbox.action';

@Component({
	selector: 'app-selectiontool',
	templateUrl: './selectiontool.component.html',
	styleUrls: ['./selectiontool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.Default,
})
export class SelectiontoolComponent extends ToolBaseComponent {
	constructor(
		private toolboxActions: ToolboxActions) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = 'url(assets/img/cursor/selectiontool_cursor.svg) 10 9, default';
	}

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
