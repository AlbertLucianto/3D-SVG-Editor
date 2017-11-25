import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appDrawableHost]',
})
export class DrawableDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
