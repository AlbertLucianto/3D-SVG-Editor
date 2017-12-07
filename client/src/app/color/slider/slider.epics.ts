import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { PathActions } from '../../canvas/path/path.action';
import { IAppState } from '../../store/model';
import { Color } from '../rim/rim.color.model';
import { SliderActionType } from './slider.action';

const doneAction = { type: 'DONE', payload: undefined, meta: undefined };

@Injectable()
export class SliderEpics {
	constructor(
		private pathActions: PathActions) { }

	public createEpics = () => {
		return [
			createEpicMiddleware(this.changeSelectedColorOnChange()),
		];
	}

	private changeSelectedColorOnChange = (): Epic<FluxStandardAction<any, undefined>, IAppState> => {
		return (action$, store) => action$
			.ofType(SliderActionType.SLIDER_CHANGE_VALUE_BY_CHANNEL)
			.do(action => { // Works, but not really testable
				const colorState = store.getState().color;
				const attribute = colorState.selected;
				const color = <Color>colorState.rim.getIn([attribute, 'color']);
				store.getState().canvas.selected.toArray().forEach(targetIn =>
					this.pathActions.changeColor(targetIn.toArray(), attribute, color.toRGBString()));
			})
			.mapTo(doneAction);
	}
}
