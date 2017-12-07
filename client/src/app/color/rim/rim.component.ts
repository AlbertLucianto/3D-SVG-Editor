import { dispatch, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { colorPickerReducer } from '../color.reducer';
import { ColorAttribute, RimState } from '../rim/rim.model';
import { RimActions } from './rim.action';

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

	constructor(private rimActions: RimActions) { }

	get fillColor$() {
		return this.rim$.map(rim => rim.fill.color.toRGBString());
	}

	get outlineColor$() {
		return this.rim$.map(rim => rim.outline.color.toRGBString());
	}

	get separatorStyle$() {
		const outlineActive = this.selected === ColorAttribute.Outline;
		const cb = (val: number) => Math.max(val - 50, 0);

		return this.rim$.map(rim => ({
			'box-shadow': `
			${outlineActive ? '5px 5px 25px -5px' : '0 5px 10px -5px'}
			${rim.outline.color
				.update('r', cb).update('g', cb).update('b', cb)
				.toRGBAString(outlineActive ? 0.75 : 0.25)}
			inset`,
		}));
	}

	getShadowStyle$(attribute: ColorAttribute) {
		const isSelected = this.selected === attribute;
		const cb = (val: number) => Math.max(val - 50, 0);

		return this.rim$.map(rim => ({
			'box-shadow': `
			${isSelected ? '5px 5px 25px -5px' : '0 5px 15px -5px'}
			${rim[attribute].color
				.update('r', cb).update('g', cb).update('b', cb)
				.toRGBAString(isSelected ? 0.75 : 0.25)}`,
		}));
	}

	/**
	 * An alternative is ['color', 'rim']
	 *
	 * But, since it will create problem with sub reducer (state get by getBasePath is passed to the reducer)
	 * it create complication in the reducer, and does not adhere to existing implementations
	 */
	getBasePath = () => ['color'];

	ngOnInit() { }

	@dispatch() selectAttribute = (e: MouseEvent, attribute: ColorAttribute) => {
		e.stopPropagation();
		return this.rimActions.ColorAttributeSelect(attribute);
	}
}
