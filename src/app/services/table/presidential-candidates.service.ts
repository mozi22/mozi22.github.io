import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import * as PresCandJSON from '@assets/jsons/presidentialCandidates.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { PresidentialCandidates } from '@models/interfaces/scrapped/PresidentialCandidates';
import { ScrappedData } from '@models/interfaces/scrapped/ScrappedData';
import { Wealthy } from '@models/interfaces/scrapped/Wealthy';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class PresidentialCandidatesService
  extends TableService<PresidentialCandidates>
  implements IService<PresidentialCandidates>
{
  readonly _TITLE: string = environment.SEO.static_pages.presidentialCandidates.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.presidentialCandidates.description;
  readonly _SHORT_DESCRIPTION: string = environment.SEO.static_pages.presidentialCandidates.shortDescription;
  readonly _KEYWORDS: string = environment.SEO.static_pages.presidentialCandidates.keywords;
  readonly _COVER: string = environment.SEO.static_pages.presidentialCandidates.cover;
  readonly _DYNAMIC_FEATURE: boolean = true;

  readonly _PLACEHOLDER = 'Search... e.g Trump';
  readonly source =
    'https://www.forbes.com/sites/danalexander/2019/08/14/heres-the-net-worth-of-every-2020-presidential-candidate/?sh=3c9e132237c5';
  readonly comments: string[] = [];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    const scrappedData = (PresCandJSON as any).default as ScrappedData<PresidentialCandidates>;
    this.comments.push(`<b>Last Updated:</b> ${scrappedData.date}`);

    this._originalDataTable = this._latestDataTable = scrappedData.data;
  }

  public setupSEOTags() {
    this.seoService.setupSEOTags(this._TITLE, this._SHORT_DESCRIPTION, this._KEYWORDS);
    this.seoService.updateCanonicalUrl(`${environment.base}/${environment.routes.presidentialCandidates}`);
  }
  protected matches(tableData: Worth<PresidentialCandidates>, term: string, pipe: PipeTransform): boolean {
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
  public get shortDescription(): string {
    return this._SHORT_DESCRIPTION;
  }

  public get description(): string {
    return this._DESCRIPTION;
  }

  public get dataTable(): Observable<Worth<PresidentialCandidates>[]> {
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
