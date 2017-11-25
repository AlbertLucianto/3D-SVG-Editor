import { NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import 'polyfills';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';

import { AppComponent } from './app.component';
import { CanvasModule } from './canvas/canvas.module';
import { StoreModule } from './store/store.module';
import { ToolboxModule } from './toolbox/toolbox.module';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		NgReduxModule,
		CanvasModule,
		StoreModule,
		ToolboxModule,
	],
	providers: [ElectronService],
	bootstrap: [AppComponent],
})
export class AppModule { }
