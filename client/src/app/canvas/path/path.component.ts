import { dispatch, select$ } from '@angular-redux/store';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	ElementRef,
	Input,
	OnInit,
	Renderer2,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';

import { ActionFromEvent, RegisteredListener } from '../canvas.model';
import { DrawableBaseComponent } from '../drawable/drawable.base.component';
import { Drawable } from '../drawable/drawable.model';
import { Path } from './path.model';

const filterListener = (listeners$: Observable<List<RegisteredListener>>) =>
listeners$.map(listeners => <List<RegisteredListener>>listeners
	.filter(listener => listener.target === 'path'));

@Component({
	selector: 'app-path',
	templateUrl: './path.component.html',
	styleUrls: ['./path.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None, // default
	// about encapsulation: angular-2-training-book.rangle.io/handout/advanced-components/view_encapsulation.html
})
export class PathComponent extends DrawableBaseComponent implements OnInit, DoCheck {
	listeners: Array<Function> = [];
	@ViewChild('path') pathRef: ElementRef;
	@Input() drawable: Path;
	@select$(['toolbox', 'selected', 'listeners'], filterListener)	readonly listeners$: Observable<List<RegisteredListener>>;
	private old: Path;

	constructor(
		private rd: Renderer2,
		private cdRef: ChangeDetectorRef) { super(); }

	ngOnInit() {
		// console.log(this.drawable.toPath());
		// Attach listeners as dictated by toolbox
		this.listeners$.subscribe(listeners => {
			// clear listener from pevious tool
			this.listeners.forEach((listenerToDestroy: Function) => listenerToDestroy());
			listeners.forEach(listener => {
				this.listeners.push(this.rd.listen(this.pathRef.nativeElement, listener.name,
					(e: MouseEvent) => { this.dispatchRegisteredAction(listener.handler, e, this.drawable); },
				));
			});
		});
		this.old = this.drawable;
	}

	ngDoCheck() {
		if (this.drawable !== this.old) { this.cdRef.markForCheck(); }
		this.old = this.drawable;
	}

	/**
	 * Need to pass `drawableRef` because calling `this` in the function
	 * will refer the drawable from the currentTarget (last drawable)
	 */
	@dispatch() dispatchRegisteredAction = (handler: ActionFromEvent, e: MouseEvent, drawableRef: Drawable) => {
		return handler(e, { triggeringDrawable: drawableRef, currentTriggeringDrawable: this.drawable });
	}

	trackById(idx: number, drawable: Drawable): number {
		return drawable.id;
	}
}
