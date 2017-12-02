import { AfterContentChecked, ElementRef } from '@angular/core';

import { ToolName } from '../toolbox.model';

export interface IToolContext {
	toolName: ToolName;
	isActive: boolean;
	[atts: string]: any;
}

export abstract class ToolBaseComponent implements AfterContentChecked {
	appElementRef: ElementRef;
	context: IToolContext;

	ngAfterContentChecked() {
		if (this.context.isActive) {
			this.setCursorAfterSelected();
		}
	}

	/**
	 * Called during `ngAfterContentChecked` method, is to set cursor based on tooltype accordingly
	 */
	protected abstract setCursorAfterSelected(): void;
}
