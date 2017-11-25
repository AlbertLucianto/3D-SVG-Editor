import { dispatch } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToolBaseComponent } from '../tool/tool.base.component';
import { ToolboxActions } from '../toolbox.action';

@Component({
	selector: 'app-pentool',
	templateUrl: './pentool.component.html',
	styleUrls: ['./pentool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PentoolComponent extends ToolBaseComponent implements OnInit {
	constructor(private toolboxActions: ToolboxActions) {
		super();
	}

	ngOnInit() { }

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
