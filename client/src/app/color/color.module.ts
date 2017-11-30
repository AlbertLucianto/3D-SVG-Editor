import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorComponent } from './color.component';
import { RimComponent } from './rim/rim.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		RimComponent,
		SliderComponent,
		ColorComponent,
	],
	exports: [
		ColorComponent,
	],
})
export class ColorModule { }
