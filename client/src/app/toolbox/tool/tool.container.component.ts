import {
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';

import { CanvastoolComponent } from '../canvastool/canvastool.component';
import { PentoolComponent } from '../pentool/pentool.component';
import { SelectiontoolComponent } from '../selectiontool/selectiontool.component';
import { ToolName } from '../toolbox.model';
import { IToolContext, ToolBaseComponent } from './tool.base.component';
import { ToolDirective } from './tool.directive';

const mappings = {
	[ToolName.Pentool]: PentoolComponent,
	[ToolName.Selectiontool]: SelectiontoolComponent,
	[ToolName.Canvastool]: CanvastoolComponent,
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
export class ToolContainerComponent implements OnInit, OnDestroy {
	componentRef: ComponentRef<ToolBaseComponent>;
	instance: ToolBaseComponent;
	@ViewChild(ToolDirective, { read: ViewContainerRef }) toolHost: ViewContainerRef;
	@Input() context: IToolContext;
	@Input() type: ToolName;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

	ngOnInit() {
		if (this.type) {
			const componentType = getComponentType(this.type);
			const factory = this.componentFactoryResolver.resolveComponentFactory<ToolBaseComponent>(componentType);
			this.componentRef = this.toolHost.createComponent(factory);
			this.instance = <ToolBaseComponent>this.componentRef.instance;
			this.instance.context = this.context;
		}
	}

	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
			this.componentRef = undefined;
		}
	}
}
