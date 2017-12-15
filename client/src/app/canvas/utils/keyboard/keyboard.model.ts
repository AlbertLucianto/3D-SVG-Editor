import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { keyCodeMap } from './keyCodeMap';

export class KeyboardShortcut {
	static registeredShortcuts: KeyboardShortcut[] = [];

	private eventStream: Subject<KeyboardEvent>;
	private charCodes: number[];
	private foreignCode: { [key: number]: boolean } = {};
	private state = 0;

	/**
	 * Create KeyboardShortcut and return stream of consecutive keydowns as Observable
	 * Instance will subscribe to keyboard event, process, and be tracked
	 *
	 * @param { string } combinations - Keyboard shorcuts combination, separated by '+'
	 * @example 'cmd left+shift+v'
	*/
	static create(combinations: string): Observable<KeyboardEvent> {
		const shortcut = new KeyboardShortcut();
		shortcut.charCodes = combinations.split('+').map(key => keyCodeMap[key]);
		shortcut.eventStream = new Subject<KeyboardEvent>();

		KeyboardShortcut.registeredShortcuts.push(shortcut);
		return shortcut.eventStream;
	}

	static broadcastKeydown(e: KeyboardEvent) {
		KeyboardShortcut.registeredShortcuts.forEach(sc => sc.pushKey(e));
	}

	static broadcastKeyup(e: KeyboardEvent) {
		KeyboardShortcut.registeredShortcuts.forEach(sc => sc.popKey(e));
	}

	private foreignExists = () => !!Object.keys(this.foreignCode).length;

	/**
	 * Update to next state (state + 1) if keyboard event match the expected state
	 * Otherwise, push to unexpected keypress list (foreignCode)
	 */
	private pushKey = (e: KeyboardEvent) => {
		const code = e.which || e.charCode;
		if (this.charCodes[this.state] === code) {
			this.state++;
		} else if (!this.charCodes.includes(code)
							 && !(code >= 65 && code <= 90) 		// Exclude alphabet
							 && !(code >= 48 && code <= 57)) { 	// Exclude numeric
			this.foreignCode[code] = true;
		}
		if (this.state === this.charCodes.length && !this.foreignExists()) {
			this.eventStream.next(e);
		}
	}

	/**
	 * Set state to released key position, otherwise clear from foreignCode list
	 */
	private popKey = (e: KeyboardEvent) => {
		const code = e.which || e.charCode;
		const idx = this.charCodes.findIndex(val => val === code);
		if (idx !== -1) {
			this.state = Math.min(idx, this.state);
		} else {
			delete this.foreignCode[code];
		}
	}
}

/**
 * Must be after KeyboardShortcut class definition,
 * due to JavaScript hoisting prevention in class
 */
Observable.fromEvent<KeyboardEvent>(document, 'keydown')
	// .distinctUntilChanged((a, b) => a.keyCode === b.keyCode && a.type === b.type)
	.subscribe((e: KeyboardEvent) => KeyboardShortcut.broadcastKeydown(e));

Observable.fromEvent<KeyboardEvent>(document, 'keyup')
	// .distinctUntilChanged((a, b) => a.keyCode === b.keyCode && a.type === b.type)
	.subscribe((e: KeyboardEvent) => KeyboardShortcut.broadcastKeyup(e));
