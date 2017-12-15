import {
	ApplicationRef,
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	DoCheck,
	ElementRef,
	Injector,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';

import { CanvastoolComponent } from '../canvastool/canvastool.component';
import { DirectSelectiontoolComponent } from '../directtool/directtool.component';
import { PentoolComponent } from '../pentool/pentool.component';
import { RotatetoolComponent } from '../rotatetool/rotatetool.component';
import { SelectiontoolComponent } from '../selectiontool/selectiontool.component';
import { ToolName } from '../toolbox.model';
import { IToolContext, ToolBaseComponent } from './tool.base.component';
import { ToolDirective } from './tool.directive';

const mappings = {
	[ToolName.Pentool]: PentoolComponent,
	[ToolName.Selectiontool]: SelectiontoolComponent,
	[ToolName.Canvastool]: CanvastoolComponent,
	[ToolName.DirectSelectiontool]: DirectSelectiontoolComponent,
	[ToolName.Rotatetool]: RotatetoolComponent,
};

const getComponentType = (typeName: ToolName) => {
	const type = mappings[typeName];
	return type;
};

@Component({
	selector: 'app-tool-container',
	templateUrl: './tool.container.component.html',
	styleUrls: ['./tool.container.component.scss'],
})
export class ToolContainerComponent implements OnInit, OnDestroy, DoCheck {
	componentRef: ComponentRef<ToolBaseComponent>;
	instance: ToolBaseComponent;
	@ViewChild(ToolDirective, { read: ViewContainerRef }) toolHost: ViewContainerRef;
	@Input() context: IToolContext;
	@Input() type: ToolName;
	appElementRef: ElementRef; // To be used by rendered tool

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		applicationRef: ApplicationRef,
		injector?: Injector) {
		this.appElementRef = injector.get(applicationRef.componentTypes[0]).root;
	}

	ngOnInit() {
		if (this.type) {
			const componentType = getComponentType(this.type);
			const factory = this.componentFactoryResolver.resolveComponentFactory<ToolBaseComponent>(componentType);
			this.componentRef = this.toolHost.createComponent(factory);
			this.instance = <ToolBaseComponent>this.componentRef.instance;
			this.instance.context = this.context;
			this.instance.appElementRef = this.appElementRef;
		}
	}

	ngDoCheck() {
		this.instance.context = this.context;
	}

	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
			this.componentRef = undefined;
		}
	}
}
