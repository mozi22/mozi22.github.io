import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import * as cars from '@assets/jsons/cars.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Car } from '@models/interfaces/scrapped/Car';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class CarService extends TableService<Car> implements IService<Car> {
  readonly _TITLE: string = environment.SEO.static_pages.cars.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.cars.description;
  readonly _KEYWORDS: string = environment.SEO.static_pages.cars.keywords;

  readonly _PLACEHOLDER = 'Search... e.g Audi';
  readonly source = 'https://fastestlaps.com/lists/top-most-expensive-cars';
  readonly comments = ['Conversion applied from Euro to USD at $1.2 per Euro'];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    this._originalDataTable = this._latestDataTable = (cars as any).default as Worth<Car>[];
    this.seoService.setupSEOTags(this._TITLE, this._DESCRIPTION, this._KEYWORDS);
  }

  protected matches(tableData: Worth<Car>, term: string, pipe: PipeTransform): boolean {
    return (tableData.data as Car).name.toLowerCase().includes(term.toLowerCase());
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

  public get dataTable(): Observable<Worth<Car>[]> {
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
