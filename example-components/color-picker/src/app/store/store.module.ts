import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { IAppState } from './model';
import { RootEpics } from './epics';
import { rootReducer } from './reducers';

@NgModule({
  imports: [
    NgReduxModule,
  ],
  providers: [
    RootEpics,
  ],
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    rootEpics: RootEpics,
  ) {
    store.configureStore(
      rootReducer,
      {},
      [...rootEpics.createEpics()],
      devTools.isEnabled() ? [ devTools.enhancer() ] : [],
    );
  }
}
