import { dispatch } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToolBaseComponent } from '../tool/tool.base.component';
import { ToolboxActions } from '../toolbox.action';

@Component({
	selector: 'app-canvastool',
	templateUrl: './canvastool.component.html',
	styleUrls: ['./canvastool.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvastoolComponent extends ToolBaseComponent implements OnInit {
	constructor(private toolboxActions: ToolboxActions) {
		super();
	}

	ngOnInit() { }

	@dispatch() selectTool = () => this.toolboxActions.selectToolAction(this.context.toolName);
}
