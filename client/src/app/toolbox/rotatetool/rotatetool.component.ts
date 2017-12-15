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
	selector: 'app-rotatetool',
	templateUrl: './rotatetool.component.html',
	styleUrls: ['./rotatetool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RotatetoolComponent extends ToolBaseComponent implements DoCheck {
	hotKey = 'r';

	constructor(
		private toolboxActions: ToolboxActions,
		private cdRef: ChangeDetectorRef) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = '-webkit-col-resize';
		this.appElementRef.nativeElement.style.cursor = 'col-resize';
	}

	ngDoCheck() {
		if (this.old !== this.context.isActive) { this.cdRef.markForCheck(); }
	}

	afterHotKeyDown = () => { this.selectTool(); };

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
