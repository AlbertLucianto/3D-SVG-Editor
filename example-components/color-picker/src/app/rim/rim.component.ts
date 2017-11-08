import { WithSubStore, select, select$, dispatch } from '@angular-redux/store';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { rimComponentReducer } from './rim.reducers';
import { SelectAttributeAction } from './rim.actions';
import { ColorType, IFill } from './rim.model';

export const getColor = (fill$: Observable<IFill>): Observable<ColorType> =>
  fill$.map(fill => fill.color.toString());

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
  @select('activeAttribute')      readonly selectedAttribute$: Observable<string>;
  @select$('fill', getColor)      readonly fillColor$: Observable<string>;
  @select$('outline', getColor)   readonly outlineColor$: Observable<string>;
  getBasePath = () => ['rim'];
  @dispatch() selectAttribute = (attribute: string) => {
    return new SelectAttributeAction(attribute);
  }
}
