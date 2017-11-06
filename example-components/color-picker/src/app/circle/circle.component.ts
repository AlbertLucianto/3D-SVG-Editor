import { WithSubStore, select, dispatch } from '@angular-redux/store';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { circleComponentReducer } from './circle.reducers';
import { SelectAction } from './circle.actions';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: circleComponentReducer,
})
@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
})
export class CircleComponent {
  @select('attribute') readonly selectedAttribute$: Observable<string>;
  getBasePath = () => [ 'circle' ];
  @dispatch() selectAttribute = (attribute: string) => {
    return new SelectAction(attribute);
  }
}
