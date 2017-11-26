import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appAnchorHost]',
})
export class AnchorDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
