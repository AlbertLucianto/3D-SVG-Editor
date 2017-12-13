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
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';

import { BaseAnchor, IHandle } from '../../anchor/anchor.model';
import { ActionFromEvent, RegisteredListener } from '../../canvas.model';
import { filterListener } from '../../drawable/drawable.base.component';
import { Drawable } from '../../drawable/drawable.model';
import { AnchorBaseComponent } from '../anchor.base.component';
import { CubicBezierAnchor } from './bezier.model';

@Component({
	selector: 'app-anchor-bezier',
	templateUrl: './bezier.component.html',
	styleUrls: ['./bezier.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BezierAnchorComponent extends AnchorBaseComponent implements OnInit, DoCheck {
	listeners: Array<Function> = [];
	@ViewChild('anchor') anchorRef: ElementRef;
	@Input() anchor: BaseAnchor;
	@select$(['toolbox', 'selected', 'listeners'], filterListener('anchor'))	readonly listeners$: Observable<List<RegisteredListener>>;
	private old: BaseAnchor;

	constructor(
		private rd: Renderer2,
		private cdRef: ChangeDetectorRef) { super(); }

	get style() {
		return {
			transform: this.anchor.transformStyle,
		};
	}

	get handleStyles() {
		return this.handles.map(value => ({ transform: value.headTransformStyle }));
	}

	get handles(): Array<IHandle> {
		return (<CubicBezierAnchor>this.anchor).handleLines;
	}

	ngOnInit() {
		// Attach listeners as dictated by toolbox
		this.listeners$.subscribe(listeners => {
			// clear listener from pevious tool
			this.listeners.forEach((listenerToDestroy: Function) => listenerToDestroy());
			listeners.forEach(listener => {
				this.listeners.push(this.rd.listen(this.anchorRef.nativeElement, listener.name,
					(e: MouseEvent) => { this.dispatchRegisteredAction(listener.handler, e, this.anchor); },
				));
			});
		});
		this.old = this.anchor;
	}

	ngDoCheck() {
		if (this.old !== this.anchor) { this.cdRef.markForCheck(); }
		this.old = this.anchor;
	}

	/**
	 * Need to pass `drawableRef` because calling `this` in the function
	 * will refer the drawable from the currentTarget (last anchor)
	 */
	@dispatch() dispatchRegisteredAction = (handler: ActionFromEvent, e: MouseEvent, drawableRef: Drawable) => {
		return handler(e, { triggeringDrawable: drawableRef, currentTriggeringDrawable: this.anchor });
	}
}
