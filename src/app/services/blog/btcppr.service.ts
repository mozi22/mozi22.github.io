import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { SortEvent } from '@directives/sortable.directive';
import { environment } from '@env/environment';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SeoService } from '@services/seo.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BtcpprService implements IService<any> {
  readonly _TITLE: string = environment.SEO.static_pages.btcppr.title;
  readonly _DESCRIPTION: string = environment.SEO.static_pages.btcppr.description;
  readonly _SHORT_DESCRIPTION: string = environment.SEO.static_pages.btcppr.shortDescription;
  readonly _KEYWORDS: string = environment.SEO.static_pages.btcppr.keywords;
  readonly _COVER: string = environment.SEO.static_pages.btcppr.cover;
  readonly _DYNAMIC_FEATURE: boolean = false;

  readonly _PLACEHOLDER = '';
  readonly source = '';
  readonly comments: string[] = [];

  constructor(pipe: DecimalPipe, private seoService: SeoService) {}

  dataTable!: Observable<Worth<any>[]>;
  loading!: Observable<boolean>;
  searchTerm!: string;

  sortColumnValues({ column, direction }: SortEvent): void {
    throw new Error('Method not implemented.');
  }

  public setupSEOTags() {
    this.seoService.updateCanonicalUrl(`${environment.base}/${environment.routes.btcppr}`);
    this.seoService.setupSEOTags(this._TITLE, this._SHORT_DESCRIPTION, this._KEYWORDS);
  }

  protected matches(tableData: Worth<any>, term: string, pipe: PipeTransform): boolean {
    return false;
  }

  public updateCoinPrices(selectedCoin: Coin): void {}

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

  public get placeholder(): string {
    return this._PLACEHOLDER;
  }
}
