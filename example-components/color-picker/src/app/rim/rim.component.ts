import { WithSubStore, select, dispatch } from '@angular-redux/store';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { rimComponentReducer } from './rim.reducers';
import { SelectAction } from './rim.actions';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: rimComponentReducer,
})
@Component({
  selector: 'app-rim-color',
  templateUrl: './rim.component.html',
  styleUrls: ['./rim.component.scss'],
})
export class RimComponent {
  @select('attribute') readonly selectedAttribute$: Observable<string>;
  getBasePath = () => ['rim'];
  @dispatch() selectAttribute = (attribute: string) => {
    return new SelectAction(attribute);
  }
}
