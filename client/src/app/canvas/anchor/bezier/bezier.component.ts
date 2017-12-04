import { dispatch, select$ } from '@angular-redux/store';
import {
	ChangeDetectionStrategy,
	Component,
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
import { Drawable } from '../../drawable/drawable.model';
import { AnchorBaseComponent } from '../anchor.base.component';
import { CubicBezierAnchor } from './bezier.model';

const filterListener = (listeners$: Observable<List<RegisteredListener>>) =>
listeners$.map(listeners => <List<RegisteredListener>>listeners
	.filter(listener => listener.target === 'anchor'));

@Component({
	selector: 'app-anchor-bezier',
	templateUrl: './bezier.component.html',
	styleUrls: ['./bezier.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BezierAnchorComponent extends AnchorBaseComponent implements OnInit {
	listeners: Array<Function> = [];
	@ViewChild('anchor') anchorRef: ElementRef;
	@Input() anchor: BaseAnchor;
	@select$(['toolbox', 'selected', 'listeners'], filterListener)	readonly listeners$: Observable<List<RegisteredListener>>;

	constructor(private rd: Renderer2) { super(); }

	get style() {
		return {
			transform: this.anchor.transformStyle,
			'pointer-events': this.anchor.idx === 0 ? 'auto' : 'none', // Test only for stopping cursor following
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
	}

	/**
	 * Need to pass `drawableRef` because calling `this` in the function
	 * will refer the drawable from the currentTarget (last anchor)
	 */
	@dispatch() dispatchRegisteredAction = (handler: ActionFromEvent, e: MouseEvent, drawableRef: Drawable) => {
		return handler(e, { triggeringDrawable: drawableRef, currentTriggeringDrawable: this.anchor });
	}
}
