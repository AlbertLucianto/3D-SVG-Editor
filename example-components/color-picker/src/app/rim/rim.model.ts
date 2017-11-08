const inColorRange = (value: number): boolean => {
  return value > 0 && value < 255;
};

export class ColorRGB {
  protected _r: number;
  protected _g: number;
  protected _b: number;

  constructor(r: number, g: number, b: number) {
    if (
      inColorRange(r)
      && inColorRange(g)
      && inColorRange(b)
    ) {
      console.error('Valid color rgb must be between 0 and 255 each');
    } else {
      this._r = r;
      this._g = g;
      this._b = b;
    }
  }

  get r() { return this._r; }
  get g() { return this._g; }
  get b() { return this._b; }
  set r(r: number) {
    if (inColorRange(r)) {
      this._r = r;
    } else { console.error('Valid color rgb must be between 0 and 255'); }
  }
  set g(g: number) {
    if (inColorRange(g)) {
      this._g = g;
    } else { console.error('Valid color rgb must be between 0 and 255'); }
  }
  set b(b: number) {
    if (inColorRange(b)) {
      this._b = b;
    } else { console.error('Valid color rgb must be between 0 and 255'); }
  }
}

export type ColorType = string | ColorRGB;

export interface IFill {
  color: ColorType;
}

export interface IOutline {
  color: ColorType;
  width: number;
}

export interface IRim {
  activeAttribute: string;
  fill: IFill;
  outline: IOutline;
}

export class InitRim implements IRim {
  activeAttribute: string;
  fill: IFill;
  outline: IOutline;
  constructor(activeAttribute: string, fill: IFill, outline: IOutline) {
    this.activeAttribute = activeAttribute;
    this.fill = fill;
    this.outline = outline;
  }
}

export abstract class ColorMixin {
  protected _color: ColorType;
  get color(): ColorType {
    return this._color;
  }
  set color(color: ColorType) {
    if (<ColorRGB>color !== undefined) {
      this._color = color;
    } else if (<string>color !== undefined) {
      const re = /\^#(?:[0-9a-fA-F]{3}){1,2}$/;
      if (!re.test(<string>color)) {
        console.error('Valid color hex must be # followed by 3 or 6 hex numbers');
      } else {
        this._color = color;
      }
    } else {
      console.error('Invalid color input');
    }
  }
}

export class Fill extends ColorMixin implements IFill {
  constructor(color: ColorType) {
    super();
    this.color = color;
  }
}

export class Outline extends ColorMixin implements IOutline {
  public width: number;
  constructor(color: ColorType, width: number) {
    super();
    this.color = color;
    this.width = width;
  }
}
