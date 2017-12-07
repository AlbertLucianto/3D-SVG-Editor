import parseColor from 'parse-color';

export const inColorRange = (value: number): boolean => value >= 0 && value < 256;

export const validateColorHex = (hex: string): boolean => {
	const re = /\^#(?:[0-9a-fA-F]{3}){1,2}$/;
	return re.test(hex);
};

export const componentToHex = (c: number): string => {
	const hex = c.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

/**
 * Create clamp between min and max, inclusive
 * @param { number } min - Minimum (for color supposedly integer 0)
 * @param { number } max - Maximum (for color supposedly integer 255)
 */
export const createClamp = (min: number, max: number): (value: number) => number =>
	num => Math.round(num <= min ? min : num >= max ? max : num);

export interface IRGBObject { r: number; g: number; b: number; opacity?: number; }

/**
 * Color is a class to easily manipulate color attribute and convert it to
 * string css style, or an object.
 *
 * This class works like an immutable data structure, which always yield new object
 * on mutation
 */
export class Color {
	protected _r: number;
	protected _g: number;
	protected _b: number;
	protected _opacity: number;
	get r() { return this._r; }
	get g() { return this._g; }
	get b() { return this._b; }
	get opacity() { return this._opacity; }

	/**
	 * @param { string | IRGBOBject } color - parameter can be plain css string,
	 * or an object with key r, g, b, and optional opacity
	 */
	constructor(color: string|IRGBObject = '#000') {
		if (typeof color === 'string') {
			const result: Array<number> = parseColor(color).rgba;
			if (!!result) {
				this._r = result[0];
				this._g = result[1];
				this._b = result[2];
				this._opacity = result[3];
			} else {
				console.error('Invalid color string input:', color, ', after parsed: ', result);
			}
		} else if (<IRGBObject>color !== undefined) {
			const clampOpacity = createClamp(0, 1);
			this._opacity = clampOpacity(color.opacity || 1);
			if ( inColorRange(color.r)
				&& inColorRange(color.g)
				&& inColorRange(color.b)
			) {
				this._r = Math.round(color.r);
				this._g = Math.round(color.g);
				this._b = Math.round(color.b);
			} else {
				const clampColor = createClamp(0, 255);
				this._r = clampColor(color.r);
				this._g = clampColor(color.g);
				this._b = clampColor(color.b);
				console.error('Valid color rgb must be integer between 0 and 255 each, found: ', color);
			}
		}
	}

	set = (channel: 'r'|'g'|'b'|'opacity', value: number): Color => {
		channel === 'opacity' ?
			console.assert(value <= 1 && value >= 0, 'Opacity should be between 0 and 1 inclusive, found:', value) :
			console.assert(inColorRange(value), 'Invalid color value, should be between 0 and 255 inclusive, found:', value);
		return new Color({ ...this.toObject(), [channel]: value });
	}

	update = (channel: 'r'|'g'|'b'|'opacity', mutation: (val: number) => number): Color => {
		const newValue = mutation(this[channel]);
		channel === 'opacity' ?
			console.assert(newValue <= 1 && newValue >= 0, 'Opacity should be between 0 and 1 inclusive, found:', newValue) :
			console.assert(inColorRange(newValue), 'Invalid color value, should be between 0 and 255 inclusive, found:', newValue);
		return new Color({ ...this.toObject(), [channel]: newValue });
	}

	toRGBString = () => `rgb(${this._r}, ${this._g}, ${this._b})`;
	toRGBAString = (alpha: number = this._opacity) => `rgba(${this._r}, ${this._g}, ${this._b}, ${alpha})`;
	toHexString = () => rgbToHex(this._r, this._g, this._b);
	toObject = (): IRGBObject => ({ r: this._r, g: this._g, b: this._b, opacity: this._opacity });
}
