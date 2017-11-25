import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnchorComponent } from './anchor.component';
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
	],
	entryComponents: [
		BezierAnchorComponent,
		BasicAnchorComponent,
		CubicAnchorComponent,
	],
	exports: [
		AnchorComponent,
	],
})
export class AnchorModule { }
