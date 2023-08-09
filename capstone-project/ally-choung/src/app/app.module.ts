import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AVizComponent } from './a-viz/a-viz.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CountryMapComponent } from './country-map/country-map.component';
import { DataPointsComponent } from './data-points/data-points.component';
import { DataService } from './data.service';
import { DefinitionsComponent } from './definitions/definitions.component';
import { NavComponent } from './nav/nav.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryMapComponent,
    ScatterPlotComponent,
    BarChartComponent,
    NavComponent,
    DataPointsComponent,
    DefinitionsComponent,
    AVizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
