import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { BaseAnchor } from '../../anchor/anchor.model';
import { AnchorBaseComponent } from '../anchor.base.component';

@Component({
	selector: 'app-anchor-bezier',
	templateUrl: './bezier.component.html',
	styleUrls: ['./bezier.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class BezierAnchorComponent extends AnchorBaseComponent implements OnInit {
	@Input() anchor: BaseAnchor;

	constructor() { super(); }

	ngOnInit() {
	}

}
