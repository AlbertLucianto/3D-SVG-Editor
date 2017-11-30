import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AnchorActions } from './anchor.action';
import { AnchorComponent } from './anchor.container.component';
import { AnchorDirective } from './anchor.directive';
import { BasicAnchorComponent } from './basic/basic.component';
import { BezierAnchorComponent } from './bezier/bezier.component';
import { SmoothAnchorComponent } from './smooth/smooth.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		BezierAnchorComponent,
		BasicAnchorComponent,
		AnchorComponent,
		AnchorDirective,
		SmoothAnchorComponent,
	],
	entryComponents: [
		BezierAnchorComponent,
		BasicAnchorComponent,
		SmoothAnchorComponent,
	],
	providers: [
		AnchorActions,
	],
	exports: [
		AnchorComponent,
	],
})
export class AnchorModule { }
