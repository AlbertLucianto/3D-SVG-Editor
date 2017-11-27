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

import { DrawableBaseComponent } from '../drawable/drawable.base.component';
import { AnchorBaseComponent } from './anchor.base.component';
import { AnchorDirective } from './anchor.directive';
import { AnchorType, BaseAnchor } from './anchor.model';
import { BasicAnchorComponent } from './basic/basic.component';
import { BezierAnchorComponent } from './bezier/bezier.component';

const mappings = {
	[AnchorType.LineTo]: BasicAnchorComponent,
	[AnchorType.MoveTo]: BasicAnchorComponent,
	[AnchorType.QuadraticBezierCurve]: BezierAnchorComponent,
	[AnchorType.SmoothQuadraticBezierCurveTo]: BasicAnchorComponent, // This type is exactly the same with BasicAnchor, except it starts with T
};

const getComponentType = (typeName: AnchorType) => {
	const type = mappings[typeName];
	return type;
};

@Component({
	selector: 'app-anchor',
	templateUrl: './anchor.component.html',
	styleUrls: ['./anchor.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorComponent extends DrawableBaseComponent implements OnInit, OnDestroy {
	componentRef: ComponentRef<AnchorBaseComponent>;
	instance: AnchorBaseComponent;
	@ViewChild(AnchorDirective, { read: ViewContainerRef }) anchorHost: ViewContainerRef;
	@Input() drawable: BaseAnchor;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) { super(); }

	ngOnInit() {
		if (this.drawable.anchorType) {
			const anchorType = getComponentType(this.drawable.anchorType);
			const factory = this.componentFactoryResolver.resolveComponentFactory<AnchorBaseComponent>(anchorType);
			this.componentRef = this.anchorHost.createComponent(factory);
			this.instance = this.componentRef.instance;
			this.instance.anchor = this.drawable;
		}
	}

	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
			this.componentRef = undefined;
		}
	}
}
