import { dispatch, select, WithSubStore } from '@angular-redux/store';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnInit,
	Renderer2,
	ViewChild,
} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

import { colorPickerReducer } from '../color.reducer';
import { createClamp } from '../rim/rim.color.model';
import { Color, ColorAttribute, RimState } from '../rim/rim.model';
import { SliderActions } from './slider.action';

const clampColor = createClamp(0, 255);

@WithSubStore({
	basePathMethodName: 'getBasePath',
	localReducer: colorPickerReducer,
})
@Component({
	selector: 'app-slider-color',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit {
	@ViewChild('bar')	barEl: ElementRef;
	@Input() selected: ColorAttribute;
	@Input() channel: 'r'|'g'|'b';
	@select('rim')			readonly rim$: Observable<RimState>;
	startPos: number;
	dragging: boolean;
	onDragListener: Function;
	endDragListener: Function;

	constructor(
		private sliderActions: SliderActions,
		private rd: Renderer2) { }

	get color$(): Observable<Color> {
		return this.rim$.map(rim => rim[this.selected].color);
	}

	get opacity$(): Observable<number> {
		return this.rim$.map(rim => rim[this.selected].opacity);
	}

	get barStyle$(): Observable<Object> {
		return this.color$
			.mergeMap(color =>
				this.opacity$.map(opacity => ({
					background: `
					linear-gradient(to right,
					${color.set(this.channel, 0).toRGBAString(opacity)},
					${color.set(this.channel, 255).toRGBAString(opacity)})
					`,
				})),
			);
	}

	get handleStyle$() {
		return this.color$
			.map(color => {
				const { width } = this.barEl.nativeElement.getBoundingClientRect();
				return {
					transform: `translateX(${(color[this.channel] / 255) * width}px)`,
				};
			});
	}

	getBasePath = () => ['color'];

	ngOnInit() { }

	startDrag = (e: MouseEvent) => {
		console.log(this.channel);
		this.startPos = e.clientX;
		this.dragging = true;
		this.onDragListener = this.rd.listen('document', 'mousemove', this.onDrag);
		this.endDragListener = this.rd.listen('document', 'mouseup', this.endDrag);
	}

	onDrag = (e: MouseEvent) => {
		if (this.dragging) {
			const rect = this.barEl.nativeElement.getBoundingClientRect();
			const newValue = 255 * (clampColor(e.clientX - rect.left) / rect.width);
			this.changeValue(newValue, this.channel); // parameter channel is required to bind with calling component
		}
	}

	endDrag = (e: MouseEvent) => {
		this.onDragListener();
		this.endDragListener();
	}

	@dispatch()
	changeValue = (newValue: number, channel: 'r'|'g'|'b') =>
		this.sliderActions.changeValueByChannel(this.selected, channel, newValue)
}
