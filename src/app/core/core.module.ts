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
import { CarComponent } from './childs/car/car.component';
import { HouseComponent } from './childs/house/house.component';
import { Snp500Component } from './childs/snp500/snp500.component';
import { CryptoComponent } from './childs/crypto/crypto.component';
import { WealthyComponent } from './childs/wealthy/wealthy.component';

@NgModule({
  declarations: [ComparisonsComponent, NgbdSortableHeader, CountryComponent, BillionairesComponent, AthleteComponent, CoinValuePredictorComponent, CarComponent, HouseComponent, Snp500Component, CryptoComponent, WealthyComponent],
  imports: [CommonModule, SharedModule, NgbModule],
  providers: [DecimalPipe],
})
export class CoreModule {}
