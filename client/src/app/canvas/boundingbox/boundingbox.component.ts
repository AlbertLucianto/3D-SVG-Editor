import { select, WithSubStore } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { List } from 'immutable';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

import { Size } from '../canvas.model';
import { canvasReducer } from '../canvas.reducer';
import { Drawable, DrawableType } from '../drawable/drawable.model';
import { Path } from '../path/path.model';

export interface IBoundingBox {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

const initBoundingBox = { top: Infinity, bottom: -Infinity, left: Infinity, right: -Infinity };

const calculatePathBound = (path: Path): IBoundingBox =>
	path.children.reduce<IBoundingBox>((accBound, anchor) => ({
		top: Math.min(anchor.absPosition.y, accBound.top),
		bottom: Math.max(anchor.absPosition.y, accBound.bottom),
		right: Math.max(anchor.absPosition.x, accBound.right),
		left: Math.min(anchor.absPosition.x, accBound.left),
	}), initBoundingBox);

@WithSubStore({
	basePathMethodName: 'getBasePath',
	localReducer: canvasReducer,
})
@Component({
	selector: 'app-bounding-box',
	templateUrl: './boundingbox.component.html',
	styleUrls: ['./boundingbox.component.scss'],
})
export class BoundingBoxComponent implements OnInit {
	@select('selected') 							readonly selected$: Observable<List<List<number>>>;
	@select('root') 									readonly root$: Observable<List<Drawable>>;
	@select(['board', 'dimension'])		readonly boardSize$: Observable<Size>;
	show: boolean;
	initWithCanvas: IBoundingBox;

	get boundingBox$(): Observable<IBoundingBox> {
		return this.selected$
			.mergeMap(selected =>
				this.root$.map(root => {
					this.show = false;
					return selected.reduce<IBoundingBox>((accBound, pathFromRoot) => {
						const drawable = <Drawable>root.getIn(pathFromRoot.toJS());
						this.show = true;
						switch (drawable.type) {
							case DrawableType.Anchor:
								return {
									top: Math.min(drawable.absPosition.y, accBound.top),
									bottom: Math.max(drawable.absPosition.y, accBound.bottom),
									right: Math.max(drawable.absPosition.x, accBound.right),
									left: Math.min(drawable.absPosition.x, accBound.left),
								};
							case DrawableType.Path:
								const pathBound = calculatePathBound(<Path>drawable);
								return {
									top: Math.min(pathBound.top, accBound.top),
									bottom: Math.max(pathBound.bottom, accBound.bottom),
									right: Math.max(pathBound.right, accBound.right),
									left: Math.min(pathBound.left, accBound.left),
								};
							default: return accBound;
						}
					}, this.initWithCanvas);
				}),
			);
	}

	get width$(): Observable<number> { return this.boundingBox$.map(bb => Math.abs(bb.right - bb.left)); }
	get height$(): Observable<number> { return this.boundingBox$.map(bb => Math.abs(bb.bottom - bb.top)); }
	get top$(): Observable<number> { return this.boundingBox$.map(bb => bb.top); }
	get left$(): Observable<number> { return this.boundingBox$.map(bb => bb.left); }

	constructor() {
		this.boardSize$.subscribe(size => this.initWithCanvas = {
			top: size.height, bottom: 0,
			left: size.width, right: 0,
		});
	}

	getBasePath = () => ['canvas'];

	ngOnInit() {
	}
}
