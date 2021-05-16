import { SortEvent } from '@directives/sortable.directive';
import { Observable } from 'rxjs';
import { Coin } from '../coingecko/Coin';
import { Worth } from '../scrapped/Worth';

export interface IService<T> {
  readonly title: string;
  readonly source: string;
  readonly comments: string[];
  readonly description: string;

  dataTable: Observable<Worth<T>[]>;

  loading: Observable<boolean>;
  searchTerm: string;
  placeholder: string;

  sortColumnValues({ column, direction }: SortEvent): void;
  updateCoinPrices(selectedCoin: Coin): void;
}
