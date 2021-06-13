import { DecimalPipe } from '@angular/common';
import { Injectable, OnDestroy, PipeTransform } from '@angular/core';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Car } from '@models/interfaces/scrapped/Car';
import { Crypto } from '@models/interfaces/scrapped/Crypto';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { CoinService } from '@services/coin.service';
import { SeoService } from '@services/seo.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class CryptoService extends TableService<Crypto> implements IService<Crypto>, OnDestroy {
  readonly _TITLE: string = environment.SEO.static_pages.crypto.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.crypto.description;
  readonly _SHORT_DESCRIPTION: string = environment.SEO.static_pages.crypto.shortDescription;
  readonly _KEYWORDS: string = environment.SEO.static_pages.crypto.keywords;
  readonly _COVER: string = environment.SEO.static_pages.crypto.cover;
  readonly _DYNAMIC_FEATURE: boolean = true;

  readonly _PLACEHOLDER = 'Search... e.g Bitcoin';
  readonly source = 'http://coingecko.com/';
  readonly comments: string[] = [];

  private readonly subscriptionCanceller: Subject<void> = new Subject<void>();

  constructor(pipe: DecimalPipe, private seoService: SeoService, private _coinService: CoinService) {
    super(pipe);

    this._coinService.coins.pipe(takeUntil(this.subscriptionCanceller)).subscribe((coins: Coin[]) => {
      this._originalDataTable = this._latestDataTable = this.transformCoinInterface(coins);
    });

    this._coinService.observeCoinPrices();
  }
  public setupSEOTags() {
    this.seoService.setupSEOTags(this._TITLE, this._SHORT_DESCRIPTION, this._KEYWORDS);
    this.seoService.updateCanonicalUrl(`${environment.base}/${environment.routes.crypto}`);
  }
  public updateCoinPrices(selectedCoin: Coin): void {
    this._latestDataTable = JSON.parse(JSON.stringify(this._originalDataTable));

    this._latestDataTable.forEach((x) => {
      x.worthInCoins = parseFloat((x.worth / selectedCoin.price).toFixed(8));
    });

    this._table$.next(this._latestDataTable);
  }

  public get title(): string {
    return this._TITLE;
  }
  public get cover(): string {
    return this._COVER;
  }
  public get shortDescription(): string {
    return this._SHORT_DESCRIPTION;
  }

  public get description(): string {
    return this._DESCRIPTION;
  }

  public get dataTable(): Observable<Worth<Crypto>[]> {
    return this._table$.asObservable();
  }
  public get placeholder(): string {
    return this._PLACEHOLDER;
  }

  public get loading(): Observable<boolean> {
    return this.loading$;
  }
  public sortColumnValues({ column, direction }: SortEvent) {
    this.onSort({ column, direction });
  }

  public ngOnDestroy(): void {
    this.subscriptionCanceller.unsubscribe();
  }

  protected matches(tableData: Worth<Car>, term: string, pipe: PipeTransform): boolean {
    return (tableData.data as Car).name.toLowerCase().includes(term.toLowerCase());
  }

  private transformCoinInterface(coins: Coin[]): Worth<Crypto>[] {
    const worthCrypto: Worth<Crypto>[] = [];
    coins.forEach((coin) => {
      worthCrypto.push({
        worth: coin.price,
        data: {
          name: coin.name,
          image: coin.image,
        },
      });
    });

    return worthCrypto;
  }
}
