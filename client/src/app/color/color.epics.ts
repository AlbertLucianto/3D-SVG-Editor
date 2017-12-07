import { Injectable } from '@angular/core';

import { SliderEpics } from './slider/slider.epics';

@Injectable()
export class ColorPickerEpics {
	constructor(
		private sliderEpics: SliderEpics) { }

	public createEpics() {
		return [
			...this.sliderEpics.createEpics(),
		];
	}
}
