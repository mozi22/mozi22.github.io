import { DecimalPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import * as athletes from '@assets/jsons/athlete.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { ScrappedData } from '@models/interfaces/scrapped/ScrappedData';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

export class AthleteService extends TableService<Athlete> implements IService<Athlete> {
  readonly _TITLE: string = environment.SEO.static_pages.athletes.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.athletes.description;
  readonly _SHORT_DESCRIPTION: string = environment.SEO.static_pages.athletes.shortDescription;
  readonly _KEYWORDS: string = environment.SEO.static_pages.athletes.keywords;
  readonly _COVER: string = environment.SEO.static_pages.athletes.cover;
  readonly _DYNAMIC_FEATURE: boolean = true;

  readonly _PLACEHOLDER = 'Search... e.g Neymar';
  readonly source = 'https://www.forbes.com/athletes/list';
  readonly comments: string[] = [];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    const scrappedData = (athletes as any).default as ScrappedData<Athlete>;
    this.comments.push(`<b>Last Updated:</b> ${scrappedData.date}`);

    this._originalDataTable = this._latestDataTable = scrappedData.data;
  }

  public setupSEOTags() {
    this.seoService.updateCanonicalUrl(`${environment.base}/${environment.routes.athletes}`);
    this.seoService.setupSEOTags(this._TITLE, this._SHORT_DESCRIPTION, this._KEYWORDS);
  }

  protected matches(tableData: Worth<Athlete>, term: string, pipe: PipeTransform): boolean {
    return (tableData.data as Athlete).name.toLowerCase().includes(term.toLowerCase());
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
  public get shortDescription(): string {
    return this._SHORT_DESCRIPTION;
  }

  public get description(): string {
    return this._DESCRIPTION;
  }

  public get dataTable(): Observable<Worth<Athlete>[]> {
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
