import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appToolHost]',
})
export class ToolDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
