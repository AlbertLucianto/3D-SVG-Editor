import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';

import { StoreModule } from './store/store.module';
import { AppComponent } from './app.component';
import { RimComponent } from './rim/rim.component';

@NgModule({
  declarations: [
    AppComponent,
    RimComponent,
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
