import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import * as NbaJSON from '@assets/jsons/nba.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Nba } from '@models/interfaces/scrapped/Nba';
import { ScrappedData } from '@models/interfaces/scrapped/ScrappedData';
import { Wealthy } from '@models/interfaces/scrapped/Wealthy';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class NbaService extends TableService<Nba> implements IService<Nba> {
  readonly _TITLE: string = environment.SEO.static_pages.nba.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.nba.description;
  readonly _SHORT_DESCRIPTION: string = environment.SEO.static_pages.nba.shortDescription;
  readonly _KEYWORDS: string = environment.SEO.static_pages.nba.keywords;
  readonly _COVER: string = environment.SEO.static_pages.nba.cover;
  readonly _DYNAMIC_FEATURE: boolean = true;

  readonly _PLACEHOLDER = 'Search... e.g Curry';
  readonly source =
    'https://www.forbes.com/sites/kurtbadenhausen/2021/01/29/the-nbas-highest-paid-players-2021-lebron-curry-durant-score-combined-235-million/';
  readonly comments: string[] = [];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    const scrappedData = (NbaJSON as any).default as ScrappedData<Nba>;
    this.comments.push(`<b>Last Updated:</b> ${scrappedData.date}`);

    this._originalDataTable = this._latestDataTable = scrappedData.data;
  }
  public setupSEOTags() {
    this.seoService.setupSEOTags(this._TITLE, this._SHORT_DESCRIPTION, this._KEYWORDS);
    this.seoService.updateCanonicalUrl(`${environment.base}/${environment.routes.nba}`);
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
  public get cover(): string {
    return this._COVER;
  }

  public get description(): string {
    return this._DESCRIPTION;
  }

  public get dataTable(): Observable<Worth<Nba>[]> {
    return this._table$.asObservable();
  }

  public get loading(): Observable<boolean> {
    return this.loading$;
  }
  public get placeholder(): string {
    return this._PLACEHOLDER;
  }
  public get shortDescription(): string {
    return this._SHORT_DESCRIPTION;
  }

  public sortColumnValues({ column, direction }: SortEvent) {
    this.onSort({ column, direction });
  }
}
