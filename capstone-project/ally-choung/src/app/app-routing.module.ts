import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CountryMapComponent } from './country-map/country-map.component';
const routes: Routes = [
  { path: 'country-map', component: CountryMapComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'scatter-plot', component: ScatterPlotComponent },
  { path: '',   redirectTo: '/country-map', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
