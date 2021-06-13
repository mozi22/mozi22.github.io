import { DecimalPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import * as countryGDP from '@assets/jsons/country_gdp.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Country } from '@models/interfaces/scrapped/Country';
import { ScrappedData } from '@models/interfaces/scrapped/ScrappedData';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

export class GdpService extends TableService<Country> implements IService<Country> {
  readonly _TITLE: string = environment.SEO.static_pages.gdp.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.gdp.description;
  readonly _SHORT_DESCRIPTION: string = environment.SEO.static_pages.gdp.shortDescription;
  readonly _KEYWORDS: string = environment.SEO.static_pages.gdp.keywords;
  readonly _COVER: string = environment.SEO.static_pages.gdp.cover;
  readonly _DYNAMIC_FEATURE: boolean = true;

  readonly _PLACEHOLDER = 'Search... e.g Germany';
  readonly source = 'https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)';
  readonly comments: string[] = [];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    const scrappedData = (countryGDP as any).default as ScrappedData<Country>;
    this.comments.push(`<b>Last Updated:</b> ${scrappedData.date}`);

    this._originalDataTable = this._latestDataTable = scrappedData.data;
  }
  public setupSEOTags() {
    this.seoService.updateCanonicalUrl(`${environment.base}/${environment.routes.gdp}`);
    this.seoService.setupSEOTags(this._TITLE, this._SHORT_DESCRIPTION, this._KEYWORDS);
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

  public get dataTable(): Observable<Worth<Country>[]> {
    return this._table$.asObservable();
  }
  public get shortDescription(): string {
    return this._SHORT_DESCRIPTION;
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
  protected matches(tableData: Worth<Country>, term: string, pipe: PipeTransform): boolean {
    return (tableData.data as Country).name.toLowerCase().includes(term.toLowerCase());
  }
}
