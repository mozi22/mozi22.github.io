import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbdSortableHeader } from '@directives/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { AthleteComponent } from './childs/athlete/athlete.component';
import { BillionairesComponent } from './childs/billionaires/billionaires.component';
import { BtcpprComponent } from './childs/btcppr/btcppr.component';
import { CarComponent } from './childs/car/car.component';
import { CountryComponent } from './childs/country/country.component';
import { CryptoComponent } from './childs/crypto/crypto.component';
import { HouseComponent } from './childs/house/house.component';
import { NbaComponent } from './childs/nba/nba.component';
import { PresidentialCandidatesComponent } from './childs/presidential-candidates/presidential-candidates.component';
import { Snp500Component } from './childs/snp500/snp500.component';
import { WealthyComponent } from './childs/wealthy/wealthy.component';
import { ComparisonsComponent } from './comparisons/comparisons.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    ComparisonsComponent,
    NgbdSortableHeader,
    CountryComponent,
    BillionairesComponent,
    AthleteComponent,
    CarComponent,
    HouseComponent,
    Snp500Component,
    CryptoComponent,
    WealthyComponent,
    NbaComponent,
    PresidentialCandidatesComponent,
    HomeComponent,
    BtcpprComponent,
  ],
  imports: [CommonModule, SharedModule, NgbModule],
  providers: [DecimalPipe],
})
export class CoreModule {}
