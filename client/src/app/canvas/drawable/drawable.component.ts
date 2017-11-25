import {
	ChangeDetectionStrategy,
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation,
} from '@angular/core';

import { AnchorComponent } from '../anchor/anchor.component';
import { GroupComponent } from '../group/group.component';
import { PathComponent } from '../path/path.component';
import { DrawableBaseComponent } from './drawable.base.component';
import { DrawableDirective } from './drawable.directive';
import { Drawable, DrawableType } from './drawable.model';

const mappings = {
	[DrawableType.Path]: PathComponent,
	[DrawableType.Anchor]: AnchorComponent,
	[DrawableType.Group]: GroupComponent,
};

const getComponentType = (typeName: DrawableType) => {
	const type = mappings[typeName];
	return type;
};

@Component({
	selector: 'app-drawable',
	templateUrl: './drawable.component.html',
	styleUrls: ['./drawable.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawableComponent implements OnInit, OnDestroy {
	componentRef: ComponentRef<DrawableBaseComponent>;
	instance: DrawableBaseComponent;
	@ViewChild(DrawableDirective, { read: ViewContainerRef }) drawableHost: ViewContainerRef;
	@Input() drawable: Drawable;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

	ngOnInit() { // Using ngOnInit (instead of ngViewAfterInit) fix the templating issue
		if (this.drawable.type) {
			const drawableType = getComponentType(this.drawable.type);
			const factory = this.componentFactoryResolver.resolveComponentFactory<DrawableBaseComponent>(drawableType);
			this.componentRef = this.drawableHost.createComponent(factory);
			this.instance = this.componentRef.instance;
			this.instance.drawable = this.drawable;
		}
	}

	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
			this.componentRef = undefined;
		}
	}

}
