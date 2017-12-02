import { dispatch } from '@angular-redux/store';
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';

import { ToolBaseComponent } from '../tool/tool.base.component';
import { ToolboxActions } from '../toolbox.action';

@Component({
	selector: 'app-canvastool',
	templateUrl: './canvastool.component.html',
	styleUrls: ['./canvastool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.Default,
})
export class CanvastoolComponent extends ToolBaseComponent {
	constructor(
		private toolboxActions: ToolboxActions) { super(); }

	setCursorAfterSelected() {
		this.appElementRef.nativeElement.style.cursor = '-webkit-grab';
		this.appElementRef.nativeElement.style.cursor = 'grab';
	}

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
