import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';

import { RegisteredListener } from '../canvas.model';
import { Drawable } from './drawable.model';

export const filterListener = (target: string) => (listeners$: Observable<List<RegisteredListener>>) =>
listeners$.map(listeners => <List<RegisteredListener>>listeners
	.filter(listener => listener.target === target));

export abstract class DrawableBaseComponent {
	drawable: Drawable;
}
