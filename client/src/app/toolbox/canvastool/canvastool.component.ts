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
	selector: 'app-canvastool',
	templateUrl: './canvastool.component.html',
	styleUrls: ['./canvastool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvastoolComponent extends ToolBaseComponent implements DoCheck {
	hotKey = 'h';

	constructor(
		private toolboxActions: ToolboxActions,
		private cdRef: ChangeDetectorRef) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = '-webkit-grab';
		this.appElementRef.nativeElement.style.cursor = 'grab';
	}

	ngDoCheck() {
		if (this.old !== this.context.isActive) { this.cdRef.markForCheck(); }
	}

	afterHotKeyDown = () => { this.selectTool(); };

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
