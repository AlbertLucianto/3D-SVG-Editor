import { WithSubStore, select, select$, dispatch } from '@angular-redux/store';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { rimComponentReducer } from './rim.reducers';
import { SelectAttributeAction, ChangeFillColorAction } from './rim.actions';
import { ColorType, ColorRGB, IFill, IOutline } from './rim.model';

export const getColor = (fill$: Observable<IFill|IOutline>): Observable<string> =>
  fill$.map(fill => fill.color.toRGB());

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: rimComponentReducer,
})
@Component({
  selector: 'app-rim-color',
  templateUrl: './rim.component.html',
  styleUrls: ['./rim.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Shallow compare
})
export class RimComponent {
  constructor(private sanitizer: DomSanitizer) {} // Injectable can be used for inline 'string' styling
  test = 10;
  @select('activeAttribute')      readonly selectedAttribute$: Observable<string>;
  @select$('fill', getColor)      readonly fillColor$: Observable<string>;
  @select$('outline', getColor)   readonly outlineColor$: Observable<string>;
  get fillStyle$(): Observable<Object> {
    return this.fillColor$.map(color => ({ background: color }));
  }
  getBasePath = () => ['rim'];
  @dispatch() selectAttribute = (attribute: string) => {
    return new SelectAttributeAction(attribute);
  }
  @dispatch() changeFillColor = () => {
    return new ChangeFillColorAction(new ColorRGB({ r: 300, g: 100, b: 100 }));
  }
  incTest() {
    this.test += 1;
  }
}
