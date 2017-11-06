import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';

import { StoreModule } from './store/store.module';
import { AppComponent } from './app.component';
import { CircleComponent } from './circle/circle.component';

@NgModule({
  declarations: [
    AppComponent,
    CircleComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
