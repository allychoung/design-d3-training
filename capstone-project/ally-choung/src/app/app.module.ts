import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryMapComponent } from './country-map/country-map.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NavComponent } from './nav/nav.component';
import { DataPointsComponent } from './data-points/data-points.component';
import { DefinitionsComponent } from './definitions/definitions.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryMapComponent,
    ScatterPlotComponent,
    BarChartComponent,
    NavComponent,
    DataPointsComponent,
    DefinitionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
