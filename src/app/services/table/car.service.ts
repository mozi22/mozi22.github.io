import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import * as cars from '@assets/jsons/cars.json';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Car } from '@models/interfaces/scrapped/Car';
import { ScrappedData } from '@models/interfaces/scrapped/ScrappedData';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class CarService extends TableService<Car> implements IService<Car> {
  readonly _TITLE: string = environment.SEO.static_pages.cars.title;
  readonly _SHORT_DESCRIPTION: string = environment.SEO.static_pages.cars.shortDescription;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.cars.description;
  readonly _KEYWORDS: string = environment.SEO.static_pages.cars.keywords;
  readonly _COVER: string = environment.SEO.static_pages.cars.cover;
  readonly _DYNAMIC_FEATURE: boolean = true;

  readonly _PLACEHOLDER = 'Search... e.g Audi';
  readonly source = 'https://fastestlaps.com/lists/top-most-expensive-cars';
  readonly comments: string[] = ['Conversion applied from Euro to USD at $1.2 per Euro'];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {
    super(pipe);

    const scrappedData = (cars as any).default as ScrappedData<Car>;
    this.comments.push(`<b>Last Updated:</b> ${scrappedData.date}`);

    this._originalDataTable = this._latestDataTable = scrappedData.data;
  }

  public setupSEOTags() {
    this.seoService.setupSEOTags(this._TITLE, this._SHORT_DESCRIPTION, this._KEYWORDS);
    this.seoService.updateCanonicalUrl(`${environment.base}/${environment.routes.cars}`);
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
  public get cover(): string {
    return this._COVER;
  }

  public get description(): string {
    return this._DESCRIPTION;
  }
  public get shortDescription(): string {
    return this._SHORT_DESCRIPTION;
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
