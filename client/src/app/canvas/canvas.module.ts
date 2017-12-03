import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AnchorModule } from './anchor/anchor.module';
import { BoundingBoxComponent } from './boundingbox/boundingbox.component';
import { CanvasActions } from './canvas.action';
import { CanvasComponent } from './canvas.component';
import { CanvasEpics } from './canvas.epics';
import { DrawableComponent } from './drawable/drawable.component';
import { DrawableDirective } from './drawable/drawable.directive';
import { GroupComponent } from './group/group.component';
import { PathActions } from './path/path.action';
import { PathComponent } from './path/path.component';

@NgModule({
	imports: [
		CommonModule,
		AnchorModule,
	],
	declarations: [
		PathComponent,
		GroupComponent,
		CanvasComponent,
		DrawableComponent,
		DrawableDirective,
		BoundingBoxComponent,
	],
	entryComponents: [
		GroupComponent,
		PathComponent,
	],
	providers: [
		PathActions,
		CanvasActions,
		CanvasEpics,
	],
	exports: [
		CanvasComponent,
	],
})
export class CanvasModule { }
