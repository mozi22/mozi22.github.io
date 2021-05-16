import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import * as Houses from '@assets/jsons/houses.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Country } from '@models/interfaces/scrapped/Country';
import { House } from '@models/interfaces/scrapped/House';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class HouseService extends TableService<House> implements IService<House> {
  readonly _TITLE: string = environment.SEO.static_pages.houses.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.houses.description;
  readonly _KEYWORDS: string = environment.SEO.static_pages.houses.keywords;

  readonly _PLACEHOLDER = 'Search... e.g Palm';
  readonly source = 'https://www.beautifullife.info/urban-design/15-of-the-most-expensive-houses-in-the-world/';
  readonly comments = [];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    this._originalDataTable = this._latestDataTable = (Houses as any).default as Worth<House>[];
    this.seoService.setupSEOTags(this._TITLE, this._DESCRIPTION, this._KEYWORDS);
  }

  protected matches(tableData: Worth<House>, term: string, pipe: PipeTransform): boolean {
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

  public get description(): string {
    return this._DESCRIPTION;
  }

  public get dataTable(): Observable<Worth<House>[]> {
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
