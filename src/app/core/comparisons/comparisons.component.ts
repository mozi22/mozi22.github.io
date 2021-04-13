import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { ScrappedTypes } from '@models/types/ScrappedTypes';
import { CoinService } from '@services/coin.service';
import { FactoryService } from '@services/factory.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-comparisons',
  templateUrl: './comparisons.component.html',
  styleUrls: ['./comparisons.component.scss'],
})
export class ComparisonsComponent implements OnInit, OnDestroy {
  public selectedCoin: Coin;
  public routeUrl: string;
  public availableRoutes: string[] = [
    `/${environment.routes.gdp}`,
    `/${environment.routes.billionaires}`,
    `/${environment.routes.athletes}`,
  ];

  private _selectedCoinIdx: number = 0;

  private readonly _dataService: IService<ScrappedTypes>;
  private readonly subscriptionCanceller: Subject<void> = new Subject<void>();

  constructor(private route: Router, private _factoryService: FactoryService, public coinService: CoinService) {
    this.selectedCoin = this.coinService.supportedCoins[0];
    this.routeUrl = this.route.url;

    this._dataService = this._factoryService.getComparisonService(this.routeUrl);
  }

  ngOnInit(): void {
    this.coinService.coins.pipe(takeUntil(this.subscriptionCanceller)).subscribe((coins: Coin[]) => {
      this.changeCoinPrices({ ...coins[this._selectedCoinIdx] });
    });

    this.coinService.observeCoinPrices();
  }

  private changeCoinPrices(coin: Coin) {
    this.selectedCoin = coin;
    this._dataService.updateCoinPrices(coin);
  }

  public changeSelectedCoin(idx: number): void {
    this._selectedCoinIdx = idx;
    this.changeCoinPrices({ ...this.coinService.supportedCoins[this._selectedCoinIdx] });
  }

  public get dataService(): IService<ScrappedTypes> {
    return this._dataService;
  }

  ngOnDestroy(): void {
    this.subscriptionCanceller.unsubscribe();
    clearInterval(this.coinService.intervalID);
  }
}