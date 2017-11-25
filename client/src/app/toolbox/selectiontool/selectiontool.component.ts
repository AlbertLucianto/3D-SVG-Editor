import { dispatch } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToolBaseComponent } from '../tool/tool.base.component';
import { ToolboxActions } from '../toolbox.action';

@Component({
	selector: 'app-selectiontool',
	templateUrl: './selectiontool.component.html',
	styleUrls: ['./selectiontool.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectiontoolComponent extends ToolBaseComponent implements OnInit {
	constructor(private toolboxActions: ToolboxActions) {
		super();
	}

	ngOnInit() { }

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
