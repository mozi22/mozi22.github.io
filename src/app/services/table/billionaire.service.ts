import { DecimalPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import * as billionaires from '@assets/jsons/billionaires.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

export class BillionaireService extends TableService<Billionaire> implements IService<Billionaire> {
  readonly _TITLE: string = environment.SEO.static_pages.billionaires.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.billionaires.description;
  readonly _KEYWORDS: string = environment.SEO.static_pages.billionaires.keywords;

  readonly _PLACEHOLDER = 'Search... e.g Bill';

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    this._originalDataTable = this._latestDataTable = (billionaires as any).default as Worth<Billionaire>[];
    this.seoService.setupSEOTags(this._TITLE, this._DESCRIPTION, this._KEYWORDS);
  }

  protected matches(tableData: Worth<Billionaire>, term: string, pipe: PipeTransform): boolean {
    return (tableData.data as Billionaire).name.toLowerCase().includes(term.toLowerCase());
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

  public get dataTable(): Observable<Worth<Billionaire>[]> {
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
}
