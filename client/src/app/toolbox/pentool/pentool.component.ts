import { dispatch } from '@angular-redux/store';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
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
export class PentoolComponent extends ToolBaseComponent implements DoCheck {
	hotKey = 'p';

	constructor(
		private toolboxActions: ToolboxActions,
		private cdRef: ChangeDetectorRef) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = 'url(assets/img/cursor/pentool_cursor.svg) 10 5, pointer';
	}

	ngDoCheck() {
		if (this.old !== this.context.isActive) { this.cdRef.markForCheck(); }
	}

	afterHotKeyDown = () => { this.selectTool(); };

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
