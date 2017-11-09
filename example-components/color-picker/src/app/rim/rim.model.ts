const inColorRange = (value: number): boolean => {
  return (
    value >= 0 && value < 256
    && Number.isInteger(value)
  );
};

const validateColorHex = (hex: string): boolean => {
  const re = /\^#(?:[0-9a-fA-F]{3}){1,2}$/;
  return re.test(hex);
};

const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const createClamp = (min: number, max: number): (value: number) => number => {
  return num => Math.round(num <= min ? min : num >= max ? max : num);
};

export abstract class ColorMixin {
  protected _r: number;
  protected _g: number;
  protected _b: number;
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
  public toRGB() { // Since String.toString() is also valid method
    return `rgb(${this._r}, ${this._g}, ${this._b})`;
  }
  public toHex() {
    return rgbToHex(this._r, this._g, this._b);
  }
}

export class ColorRGB extends ColorMixin {
  constructor(rgb: { r: number; g: number; b: number }) {
    super();
    if (
      inColorRange(rgb.r)
      && inColorRange(rgb.g)
      && inColorRange(rgb.b)
    ) {
      this._r = rgb.r;
      this._g = rgb.g;
      this._b = rgb.b;
    } else {
      const clampColor = createClamp(0, 255);
      this._r = clampColor(rgb.r);
      this._g = clampColor(rgb.g);
      this._b = clampColor(rgb.b);
      console.error('Valid color rgb must be integer between 0 and 255 each');
    }
  }
}

export class ColorHex extends ColorMixin {
  constructor(hex: string) {
    super();
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(_m, r, g, b) {
        return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        this._r = parseInt(result[1], 16);
        this._g = parseInt(result[2], 16);
        this._b = parseInt(result[3], 16);
    } else {
      console.error('Valid color hex must be # followed by 3 or 6 hex numbers');
    }
  }
}

export type ColorType = ColorHex | ColorRGB;

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

export abstract class AttributeColorMixin {
  protected _color: ColorType;
  get color(): ColorType {
    return this._color;
  }
  set color(color: ColorType) {
    if (color !== undefined) {
      this._color = color;
    } else {
      console.error('Invalid color input');
    }
  }
}

export class Fill extends AttributeColorMixin implements IFill {
  constructor(color: ColorType) {
    super();
    this.color = color;
  }
}

export class Outline extends AttributeColorMixin implements IOutline {
  public width: number;
  constructor(color: ColorType, width: number) {
    super();
    this.color = color;
    this.width = width;
  }
}
