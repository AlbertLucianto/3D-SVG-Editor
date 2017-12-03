import { select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { colorPickerReducer } from '../color.reducer';
import { ColorAttribute, RimState } from '../rim/rim.model';

@WithSubStore({
	basePathMethodName: 'getBasePath',
	localReducer: colorPickerReducer,
})
@Component({
	selector: 'app-rim-color',
	templateUrl: './rim.component.html',
	styleUrls: ['./rim.component.scss'],
})
export class RimComponent implements OnInit {
	@Input() selected: ColorAttribute;
	@select('rim')	readonly rim$: Observable<RimState>;

	constructor() { }

	get fillColor$() {
		return this.rim$.map(rim => rim.fill.color.toRGBString());
	}

	get outlineColor$() {
		return this.rim$.map(rim => rim.outline.color.toRGBString());
	}

	/**
	 * An alternative is ['color', 'rim']
	 *
	 * But, since it will create problem with sub reducer (state get by getBasePath is passed to the reducer)
	 * it create complication in the reducer, and does not adhere to existing implementations
	 */
	getBasePath = () => ['color'];

	ngOnInit() {
	}
}
