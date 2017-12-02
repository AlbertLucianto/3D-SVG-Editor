import { select$, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Color } from '../rim/rim.color.model';
import { ColorAttribute, Fill, Outline } from '../rim/rim.model';
import { rimReducer } from '../rim/rim.reducer';

const getColor = (attribute: Observable<Fill|Outline>): Observable<string> =>
	attribute.map(prop => prop.color.toRGBString());

@WithSubStore({
	basePathMethodName: 'getBasePath',
	localReducer: rimReducer,
})
@Component({
	selector: 'app-rim-color',
	templateUrl: './rim.component.html',
	styleUrls: ['./rim.component.scss'],
})
export class RimComponent implements OnInit {
	@Input() selected: ColorAttribute;
	@select$('fill', getColor)	readonly fillColor$: Observable<Color>;
	@select$('outline', getColor)	readonly outlineColor$: Observable<Color>;

	constructor() { }

	getBasePath = () => ['color', 'rim'];

	ngOnInit() {
	}
}
