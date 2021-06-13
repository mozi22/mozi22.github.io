import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import * as Snp500JSON from '@assets/jsons/snp500.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Country } from '@models/interfaces/scrapped/Country';
import { ScrappedData } from '@models/interfaces/scrapped/ScrappedData';
import { Snp500 } from '@models/interfaces/scrapped/Snp500';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class Snp500Service extends TableService<Snp500> implements IService<Snp500> {
  readonly _TITLE: string = environment.SEO.static_pages.snp500.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.snp500.description;
  readonly _SHORT_DESCRIPTION: string = environment.SEO.static_pages.snp500.shortDescription;
  readonly _KEYWORDS: string = environment.SEO.static_pages.snp500.keywords;
  readonly _COVER: string = environment.SEO.static_pages.snp500.cover;
  readonly _DYNAMIC_FEATURE: boolean = true;

  readonly _PLACEHOLDER = 'Search... e.g Google';
  readonly source = 'https://fknol.com/list/market-cap-sp-500-index-companies.php';
  readonly comments: string[] = [];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    const scrappedData = (Snp500JSON as any).default as ScrappedData<Snp500>;
    this.comments.push(`<b>Last Updated:</b> ${scrappedData.date}`);

    this._originalDataTable = this._latestDataTable = scrappedData.data;
  }
  public setupSEOTags() {
    this.seoService.setupSEOTags(this._TITLE, this._SHORT_DESCRIPTION, this._KEYWORDS);
    this.seoService.updateCanonicalUrl(`${environment.base}/${environment.routes.snp500}`);
  }

  protected matches(tableData: Worth<Snp500>, term: string, pipe: PipeTransform): boolean {
    return (tableData.data as Country).name.toLowerCase().includes(term.toLowerCase());
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
  public get shortDescription(): string {
    return this._SHORT_DESCRIPTION;
  }

  public get dataTable(): Observable<Worth<Snp500>[]> {
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
