import { Input, Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { select, select$, dispatch, WithSubStore } from '@angular-redux/store';
import { rimComponentReducer } from '../rim/rim.reducers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ColorType, ColorRGB } from '../rim/rim.model';
import { ChangeFillColorAction } from '../rim/rim.actions';

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
  startPos: number;
  dragging = false;
  @Input() parameter: string;
  @select('active')             readonly selectedAttribute$: Observable<string>;
  @select(['fill', 'color'])    readonly fillColor$: Observable<ColorType>;
  @select(['outline', 'color']) readonly outlineColor$: Observable<ColorType>;
  get localValue$(): Observable<number> {
    return this.selectedAttribute$
              .mergeMap(att => this[`${att}Color$`].map(color => color[this.parameter]));
  }
  get barColor$(): Observable<string> {
    return this.localValue$
              .map(val => {
                // console.log(val);
                return (new ColorRGB({
                  ...{ r: 0, g: 0, b: 0 },
                  [this.parameter]: val,
                }).toRGBString());
              });
  }
  get handleStyle$(): Observable<Object> {
    return this.localValue$.map(val => ({ left: `${val}px` }));
  }
  getBasePath = () => ['rim'];
  @dispatch() changeColor(rgb: ColorType) {
    return new ChangeFillColorAction(rgb);
  }
  startDrag(e: MouseEvent) {
    this.startPos = e.clientX;
    this.dragging = true;
  }
  // Need change, not optimised because it still rerenders every mousemove
  @HostListener('document:mousemove', ['$event'])
  onDrag(e: MouseEvent) {
    if (this.dragging) {
      this.changeColor(new ColorRGB({ r: e.clientX, g: e.clientX, b: e.clientX }));
    }
  }
  @HostListener('document:mouseup')
  endDrag() {
    this.dragging = false;
  }
}
