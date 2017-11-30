import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { DrawableBaseComponent } from '../drawable/drawable.base.component';
import { Path } from './path.model';

@Component({
	selector: 'app-path',
	templateUrl: './path.component.html',
	styleUrls: ['./path.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None, // default
	// about encapsulation: angular-2-training-book.rangle.io/handout/advanced-components/view_encapsulation.html
})
export class PathComponent extends DrawableBaseComponent implements OnInit {
	@Input() drawable: Path;

	ngOnInit() {
		console.log(this.drawable.toPath());
	}
}
