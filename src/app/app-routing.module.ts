import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparisonsComponent } from '@core/comparisons/comparisons.component';
import { HomeComponent } from '@core/home/home.component';
import { environment } from '@env/environment';

const routes: Routes = [
  {
    path: environment.routes.gdp,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.billionaires,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.athletes,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.cars,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.houses,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.snp500,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.crypto,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.wealthy,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.nba,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.presidentialCandidates,
    component: ComparisonsComponent,
  },
  {
    path: environment.routes.home,
    component: HomeComponent,
  },
  {
    path: environment.routes.btcppr,
    component: ComparisonsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
