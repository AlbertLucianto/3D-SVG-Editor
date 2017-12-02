import { select, WithSubStore } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { colorPickerReducer } from './color.reducer';
import { ColorAttribute } from './rim/rim.model';

@WithSubStore({
	basePathMethodName: 'getBasePath',
	localReducer: colorPickerReducer,
})
@Component({
	selector: 'app-color-picker',
	templateUrl: './color.component.html',
	styleUrls: ['./color.component.scss'],
})
export class ColorPickerComponent implements OnInit {
	@select('selected')		readonly selected$: Observable<ColorAttribute>;

	constructor() { }

	getBasePath = () => ['color'];

	ngOnInit() {
	}
}
