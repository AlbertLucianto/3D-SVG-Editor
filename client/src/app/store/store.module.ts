import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';

import { RootEpics } from './epics';
import { IAppState } from './model';
import { rootReducer } from './reducer';

@NgModule({
	imports: [
		NgReduxModule,
	],
	declarations: [],
	providers: [RootEpics],
})
export class StoreModule {
	constructor(
		public store: NgRedux<IAppState>,
		devTools: DevToolsExtension,
		private rootEpics: RootEpics,
	) {
		store.configureStore(
			rootReducer,
			{},
			[ ...this.rootEpics.createEpics() ],
			devTools.isEnabled() ? [ devTools.enhancer() ] : []);
	}
}
