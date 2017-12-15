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
	selector: 'app-selectiontool',
	templateUrl: './selectiontool.component.html',
	styleUrls: ['./selectiontool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectiontoolComponent extends ToolBaseComponent implements DoCheck {
	hotKey = 'v';

	constructor(
		private toolboxActions: ToolboxActions,
		private cdRef: ChangeDetectorRef) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = 'url(assets/img/cursor/selectiontool_cursor.svg) 10 9, default';
	}

	ngDoCheck() {
		if (this.old !== this.context.isActive) { this.cdRef.markForCheck(); }
	}

	afterHotKeyDown = () => { this.selectTool(); };

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
