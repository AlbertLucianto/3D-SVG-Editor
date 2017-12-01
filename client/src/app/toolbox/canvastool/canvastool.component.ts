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
	selector: 'app-canvastool',
	templateUrl: './canvastool.component.html',
	styleUrls: ['./canvastool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.Default,
})
export class CanvastoolComponent extends ToolBaseComponent implements AfterContentChecked {
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
			this.appElementRef.nativeElement.style.cursor = '-webkit-grab';
		}
	}

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
