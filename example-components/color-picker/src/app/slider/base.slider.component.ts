import { Input, Component, ChangeDetectionStrategy, HostListener, OnInit } from '@angular/core';
import { select, select$, dispatch, WithSubStore } from '@angular-redux/store';
import { rimComponentReducer } from '../rim/rim.reducers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

import { ColorType, ColorRGB } from '../rim/rim.model';
import { ChangeFillColorAction, ChangeOutlineColorAction } from '../rim/rim.actions';

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
export class BaseSliderComponent implements OnInit {
  startPos: number;
  dragging = false;
  selectedAttribute: string;
  fillColor: ColorType;
  outlineColor: ColorType;
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
  ngOnInit() {
    // Easier way to handle non-observable from observable
    this.selectedAttribute$.subscribe(att => this.selectedAttribute = att);
    this.fillColor$.subscribe(color => this.fillColor = color);
    this.outlineColor$.subscribe(color => this.outlineColor = color);
  }
  getBasePath = () => ['rim'];
  @dispatch() changeColor(color: ColorType) {
    if (this.selectedAttribute === 'fill') {
      return new ChangeFillColorAction(color);
    } else if (this.selectedAttribute === 'outline') {
      return new ChangeOutlineColorAction(color);
    }
  }
  startDrag(e: MouseEvent) {
    this.startPos = e.clientX;
    this.dragging = true;
  }
  // Need change, not optimised because it still rerenders every mousemove
  @HostListener('document:mousemove', ['$event'])
  onDrag(e: MouseEvent) {
    if (this.dragging) {
      this.changeColor(new ColorRGB({
        ...this[`${this.selectedAttribute}Color`].toObject(),
        [this.parameter]: e.clientX,
      }));
    }
  }
  @HostListener('document:mouseup')
  endDrag() {
    this.dragging = false;
  }
}
