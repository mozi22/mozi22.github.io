import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbdSortableHeader } from '@directives/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { CountryComponent } from './childs/country/country.component';
import { ComparisonsComponent } from './comparisons/comparisons.component';
import { BillionairesComponent } from './childs/billionaires/billionaires.component';
import { AthleteComponent } from './childs/athlete/athlete.component';
import { CoinValuePredictorComponent } from './coin-value-predictor/coin-value-predictor.component';

@NgModule({
  declarations: [ComparisonsComponent, NgbdSortableHeader, CountryComponent, BillionairesComponent, AthleteComponent, CoinValuePredictorComponent],
  imports: [CommonModule, SharedModule, NgbModule],
  providers: [DecimalPipe],
})
export class CoreModule {}
