import { Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { select, select$, WithSubStore } from '@angular-redux/store';
import { rimComponentReducer } from '../rim/rim.reducers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ColorType } from '../rim/rim.model';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: rimComponentReducer,
})
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Shallow compare
})
export class BaseSliderComponent {
  down = false;
  dragging = false;
  @Input() parameter: string;
  @select('activeAttribute')     readonly selectedAttribute$: Observable<string>;
  @select(['fill', 'color'])     readonly fillColor$: Observable<ColorType>;
  @select(['outline', 'color'])  readonly outlineColor$: Observable<ColorType>;
  get localValue$(): Observable<number> {
    return this.selectedAttribute$
              .mergeMap(att => {
                if (att === 'fill') {
                  return this.fillColor$.map(color => color[this.parameter]);
                } else if (att === 'outline') {
                  return this.outlineColor$.map(color => color[this.parameter]);
                }
              });
  }
  getBasePath = () => ['rim'];
  startDrag() {}
  onDrag() {}
  endDrag() {}
}
