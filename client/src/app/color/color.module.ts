import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorPickerComponent } from './color.component';
import { ColorPickerEpics } from './color.epics';
import { OpacityComponent } from './opacity/opacity.component';
import { RimComponent } from './rim/rim.component';
import { SliderComponent } from './slider/slider.component';
import { StrokeComponent } from './stroke/stroke.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		RimComponent,
		SliderComponent,
		ColorPickerComponent,
		OpacityComponent,
		StrokeComponent,
	],
	providers: [
		ColorPickerEpics,
	],
	exports: [
		ColorPickerComponent,
	],
})
export class ColorModule { }
