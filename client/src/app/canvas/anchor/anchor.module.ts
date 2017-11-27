import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AnchorActions } from './anchor.action';
import { AnchorComponent } from './anchor.component';
import { AnchorDirective } from './anchor.directive';
import { BasicAnchorComponent } from './basic/basic.component';
import { BezierAnchorComponent } from './bezier/bezier.component';
import { CubicAnchorComponent } from './cubic/cubic.component';
import { InvisibleComponent } from './invisible/invisible.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		BezierAnchorComponent,
		BasicAnchorComponent,
		AnchorComponent,
		CubicAnchorComponent,
		InvisibleComponent,
		AnchorDirective,
	],
	entryComponents: [
		BezierAnchorComponent,
		BasicAnchorComponent,
		CubicAnchorComponent,
	],
	providers: [
		AnchorActions,
	],
	exports: [
		AnchorComponent,
	],
})
export class AnchorModule { }
