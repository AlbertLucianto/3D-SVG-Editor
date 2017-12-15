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
	selector: 'app-directtool',
	templateUrl: './directtool.component.html',
	styleUrls: ['./directtool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectSelectiontoolComponent extends ToolBaseComponent implements DoCheck {
	hotKey = 'a';

	constructor(
		private toolboxActions: ToolboxActions,
		private cdRef: ChangeDetectorRef) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = 'url(assets/img/cursor/direct_cursor.svg) 10 9, default';
	}

	ngDoCheck() {
		if (this.old !== this.context.isActive) { this.cdRef.markForCheck(); }
	}

	afterHotKeyDown = () => { this.selectTool(); };

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
