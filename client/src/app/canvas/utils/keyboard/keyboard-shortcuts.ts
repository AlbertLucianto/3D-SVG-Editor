/**
 * Currently this module is unused, but may be good for future references
 */
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';

import { keyCodeMap } from './keyCodeMap';

const keyDowns = Observable.fromEvent<KeyboardEvent>(document, 'keydown');
const keyUps = Observable.fromEvent<KeyboardEvent>(document, 'keyup');

/**
 * JavaScript Bug: when CMD is hold, no alphanumeric keyup is listened
 *
 * Occurs on both Chrome and Firefox
 * https://stackoverflow.com/questions/27380018/when-cmd-key-is-kept-pressed-keyup-is-not-triggered-for-any-other-key
 */
const keyEvents = Observable
	.merge(keyDowns, keyUps)
	// .distinctUntilChanged(
	// 	(a, b) => a.keyCode === b.keyCode && a.type === b.type)
	.share();

const createKeyPressStream = (charCode: number) => ({
	char: charCode,
	stream: keyEvents
		.filter(e => e.keyCode === charCode)
		.map(e => e.type),
});

const createShortcutStream = (text: string) =>
	Observable.from(text.split('+'))
		.map(c => {
			const code = keyCodeMap[c.toLowerCase()];
			if (!code) {
				throw new Error('Invalid sequence ' + text);
			}
			return code;
		})
		.map(createKeyPressStream)
		.map(obj => obj.stream)
		.toArray()
		.flatMap(arr => Observable.combineLatest(arr))
		.do(ar => console.log(ar))
		.filter(arr => arr.reduce<boolean>(
			(isDown, cur) => isDown && cur === 'keydown',
			true))
		.map(() => text);

const validateSeq = (text: string) => {
	const arr = text.split('+');
	arr.forEach(char => {
		if (!!keyCodeMap[char]) { return false; }
	});
	return true;
};

export {
	createShortcutStream as create,
	validateSeq as validate,
};
