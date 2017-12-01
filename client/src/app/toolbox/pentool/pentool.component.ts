import { dispatch } from '@angular-redux/store';
import {
	AfterContentChecked,
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Injector,
	ViewEncapsulation,
} from '@angular/core';

import { ToolBaseComponent } from '../tool/tool.base.component';
import { ToolboxActions } from '../toolbox.action';

@Component({
	selector: 'app-pentool',
	templateUrl: './pentool.component.html',
	styleUrls: ['./pentool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.Default,
})
export class PentoolComponent extends ToolBaseComponent implements AfterContentChecked {
	appElementRef: ElementRef;
	constructor(
		private toolboxActions: ToolboxActions,
		applicationRef: ApplicationRef,
		injector: Injector) {
		super();
		this.appElementRef = injector.get(applicationRef.componentTypes[0]).root;
	}

	ngAfterContentChecked() {
		if (this.context.isActive) {
			this.appElementRef.nativeElement.style.cursor = 'url(../assets/img/cursor/pentool_cursor.svg) 10 5, pointer';
		}
	}

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
