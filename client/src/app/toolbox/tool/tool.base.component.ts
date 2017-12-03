import { AfterContentChecked, ElementRef, OnInit } from '@angular/core';
import { Action } from 'redux';

import { ToolName } from '../toolbox.model';

export interface IToolContext {
	toolName: ToolName;
	isActive: boolean;
	[atts: string]: any;
}

export abstract class ToolBaseComponent implements AfterContentChecked, OnInit {
	appElementRef: ElementRef;
	context: IToolContext;
	abstract hotKey: string;
	protected abstract selectTool: (...params: Array<any>) => Action;
	/**
	 * Required implementation for handler after hotkey is pressed
	 * @param { KeyboardEvent } e - Optional argument Event
	 */
	protected abstract afterHotKeyDown: (e?: KeyboardEvent) => void;

	ngOnInit() {
		window.addEventListener('keypress', this.checkKeyDown);
	}

	checkKeyDown = (e: KeyboardEvent) => {
		const key = e.which || e.keyCode;
		if (key === this.hotKey.charCodeAt(0)) {
			this.afterHotKeyDown(e);
		}
	}

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
