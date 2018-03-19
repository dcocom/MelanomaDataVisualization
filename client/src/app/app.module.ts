import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule as ChartJSModule } from 'ng2-charts/ng2-charts'
import { Ng2TrackScrollModule } from 'ng2-track-scroll';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PlaceholderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartJSModule,
    Ng2TrackScrollModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
