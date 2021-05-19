import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import * as WealthyJSON from '@assets/jsons/wealthy.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Wealthy } from '@models/interfaces/scrapped/Wealthy';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class WealthyService extends TableService<Wealthy> implements IService<Wealthy> {
  readonly _TITLE: string = environment.SEO.static_pages.wealthy.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.wealthy.description;
  readonly _KEYWORDS: string = environment.SEO.static_pages.wealthy.keywords;

  readonly _PLACEHOLDER = 'Search... e.g China';
  readonly source =
    'https://www.knightfrank.com/research/article/2021-03-01-how-much-wealth-gets-you-into-the-global-top-1';
  readonly comments = [];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    this._originalDataTable = this._latestDataTable = (WealthyJSON as any).default as Worth<Wealthy>[];
    this.seoService.setupSEOTags(this._TITLE, this._DESCRIPTION, this._KEYWORDS);
  }

  protected matches(tableData: Worth<Wealthy>, term: string, pipe: PipeTransform): boolean {
    return (tableData.data as Wealthy).name.toLowerCase().includes(term.toLowerCase());
  }

  public updateCoinPrices(selectedCoin: Coin): void {
    this._latestDataTable = JSON.parse(JSON.stringify(this._originalDataTable));

    this._latestDataTable.forEach((x) => {
      x.worthInCoins = parseFloat((x.worth / selectedCoin.price).toFixed(1));
    });

    this._table$.next(this._latestDataTable);
  }

  public get title(): string {
    return this._TITLE;
  }

  public get description(): string {
    return this._DESCRIPTION;
  }

  public get dataTable(): Observable<Worth<Wealthy>[]> {
    return this._table$.asObservable();
  }

  public get loading(): Observable<boolean> {
    return this.loading$;
  }
  public get placeholder(): string {
    return this._PLACEHOLDER;
  }

  public sortColumnValues({ column, direction }: SortEvent) {
    this.onSort({ column, direction });
  }
}