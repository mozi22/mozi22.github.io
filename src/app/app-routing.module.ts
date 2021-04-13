import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparisonsComponent } from '@core/comparisons/comparisons.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
