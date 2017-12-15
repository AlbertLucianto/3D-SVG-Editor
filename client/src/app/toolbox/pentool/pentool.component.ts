import { dispatch } from '@angular-redux/store';
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';

import { ToolBaseComponent } from '../tool/tool.base.component';
import { ToolboxActions } from '../toolbox.action';

@Component({
	selector: 'app-pentool',
	templateUrl: './pentool.component.html',
	styleUrls: ['./pentool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PentoolComponent extends ToolBaseComponent {
	hotKey = 'p';

	constructor(
		private toolboxActions: ToolboxActions) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = 'url(assets/img/cursor/pentool_cursor.svg) 10 5, pointer';
	}

	afterHotKeyDown = () => { this.selectTool(); };

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
