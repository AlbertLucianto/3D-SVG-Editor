import { dispatch, select, select$ } from '@angular-redux/store';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { List } from 'immutable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';

import { CanvasActions } from './canvas.action';
import { IPosition, Position, RegisteredListener } from './canvas.model';
import { Drawable } from './drawable/drawable.model';
import { Path } from './path/path.model';

const DAMP_SCROLL = 200;
const DEBOUNCE_TIME = 20;

const filterListener = (listeners$: Observable<List<RegisteredListener>>) =>
	listeners$.map(listeners => <List<RegisteredListener>>listeners
		.filter(listener => listener.target === 'canvas'));

@Component({
	selector: 'app-draw-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements OnInit {
	listeners: Array<Function> = [];
	@ViewChild('canvas') canvasRef: ElementRef;
	@select(['canvas', 'root'])																			readonly root$: Observable<List<Drawable>>;
	@select(['canvas', 'board', 'scale'])														readonly scale$: Observable<number>;
	@select(['canvas', 'board', 'moved'])														readonly moved$: Observable<IPosition>;
	@select$(['toolbox', 'selected', 'listeners'], filterListener)	readonly listeners$: Observable<List<RegisteredListener>>;
	private timeoutId: number;

	constructor(
		private rd: Renderer2,
		private canvasActions: CanvasActions) { }

	get canvasStyle$(): Observable<Object> {
		const style$ = Observable.combineLatest(
			this.scale$,
			this.moved$,
		);
		return style$.map(styles => ({
			transform: `
			translate(${styles[1].x}px, ${styles[1].y}px)
			scale(${styles[0]})
			`,
		}));
	}

	ngOnInit() {
		// Update canvas board state position; listen on change window size
		this.updateCanvasPosition();
		this.rd.listen('window', 'resize', (_e) => { this.updateCanvasPosition(); });

		// Update canvas board state scale (and position too after delay)
		this.rd.listen('window', 'wheel', (e: WheelEvent) => {
			this.updateCanvasScale(e);
			window.clearTimeout(this.timeoutId);
			this.timeoutId = window.setTimeout(() => {
				this.updateCanvasPosition();
			}, DEBOUNCE_TIME);
		});

		// Attach listeners as dictated by toolbox
		this.listeners$.subscribe(listeners => {
			// clear listener from pevious tool
			this.listeners.forEach((listenerToDestroy: Function) => listenerToDestroy());
			listeners.forEach(listener => {
				this.listeners.push(this.rd.listen(this.canvasRef.nativeElement, listener.name,
					(e: MouseEvent) => this.dispatchRegisteredAction(listener.handler, e),
				));
			});
		});
	}

	@dispatch() dispatchRegisteredAction = (handler: Function, e: MouseEvent) => {
		return handler(e, new Path({
			routeParentPath: List([]),
			idx: 0,
			absPosition: new Position({ x: 0, y: 0 }),
		})); // Still hardcoded, update later when there is 'selectedDrawable' state
	}

	@dispatch() updateCanvasPosition = () => {
		return this.canvasActions.updateTopLeft({
			x: this.canvasRef.nativeElement.getBoundingClientRect().left,
			y: this.canvasRef.nativeElement.getBoundingClientRect().top,
		});
	}

	@dispatch() updateCanvasScale = (e: WheelEvent) => {
		e.preventDefault();
		return this.canvasActions.updateScale(e.deltaY / DAMP_SCROLL);
	}
}
