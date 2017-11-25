import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DrawableBaseComponent } from '../drawable/drawable.base.component';
import { Group } from '../group/group.model';
import { Path } from '../path/path.model';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent extends DrawableBaseComponent implements AfterViewInit {
	drawable: Group|Path;

	ngAfterViewInit() {
	}

}
