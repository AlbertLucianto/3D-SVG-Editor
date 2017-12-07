import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorPickerComponent } from './color.component';
import { ColorPickerEpics } from './color.epics';
import { OpacityComponent } from './opacity/opacity.component';
import { RimActions } from './rim/rim.action';
import { RimComponent } from './rim/rim.component';
import { SliderActions } from './slider/slider.action';
import { SliderComponent } from './slider/slider.component';
import { SliderEpics } from './slider/slider.epics';
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
		SliderActions,
		SliderEpics,
		RimActions,
	],
	exports: [
		ColorPickerComponent,
	],
})
export class ColorModule { }
