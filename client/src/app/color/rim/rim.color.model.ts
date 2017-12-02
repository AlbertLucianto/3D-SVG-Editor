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

export interface IRGBObject { r: number; g: number; b: number; }

export class Color {
	protected _r: number;
	protected _g: number;
	protected _b: number;
	get r() { return this._r; }
	get g() { return this._g; }
	get b() { return this._b; }

	constructor(color: string|IRGBObject = '#000') {
		if (typeof color === 'string') {
			const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			color = (<string>color).replace(shorthandRegex, function(_m, r, g, b) {
					return r + r + g + g + b + b;
			});
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
			if (result) {
					this._r = parseInt(result[1], 16);
					this._g = parseInt(result[2], 16);
					this._b = parseInt(result[3], 16);
			} else {
				console.error('Valid color hex must be # followed by 3 or 6 hex numbers');
			}
		} else if (<IRGBObject>color !== undefined) {
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
				console.error('Valid color rgb must be integer between 0 and 255 each');
			}
		}
	}

	set = (channel: 'r'|'g'|'b', value: number): Color => {
		console.assert(inColorRange(value), 'Invalid color value, should be between 0 and 255 inclusive');
		return new Color({ ...this.toObject(), [channel]: value });
	}

	toRGBString = () => `rgb(${this._r}, ${this._g}, ${this._b})`;
	toRGBAString = (alpha: number) => `rgba(${this._r}, ${this._g}, ${this._b}, ${alpha})`;
	toHexString = () => rgbToHex(this._r, this._g, this._b);
	toObject = (): IRGBObject => ({ r: this._r, g: this._g, b: this._b });
}
