import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { Worth } from '@models/interfaces/scrapped/Worth';
import { SearchResult } from '@models/interfaces/table/SearchResult';
import { State } from '@models/interfaces/table/State';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, skip, switchMap, tap } from 'rxjs/operators';
import { NgbdSortableHeader, SortColumn, SortDirection, SortEvent } from '../../directives/sortable.directive';

@Injectable({
  providedIn: 'root',
})
export abstract class TableService<T> {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _search$ = new Subject<void>();
  private _total$ = new BehaviorSubject<number>(0);

  protected _table$: BehaviorSubject<Worth<T>[]> = new BehaviorSubject<Worth<T>[]>([]);
  protected _originalDataTable!: Worth<T>[];
  protected _latestDataTable!: Worth<T>[];

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  protected _state: State = {
    page: 1,
    pageSize: 50,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  private compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
  protected abstract matches(tableData: Worth<T>, term: string, pipe: PipeTransform): boolean;

  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  constructor(protected pipe: DecimalPipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
        skip(1),
      )
      .subscribe((result: SearchResult<T>) => {
        this._table$.next(result.tableData);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  protected sort<T>(orders: T[], column: SortColumn, direction: string): T[] {
    if (direction === '' || column === '') {
      return orders;
    } else {
      return [...orders].sort((a: any, b: any) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  protected _search(): Observable<SearchResult<T>> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let tableData = this.sort(this._latestDataTable, sortColumn, sortDirection);

    // 2. filter
    tableData = tableData.filter((data) => this.matches(data, searchTerm, this.pipe));
    const total = tableData.length;

    // 3. paginate
    tableData = tableData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

    return of({ tableData, total });
  }

  protected onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
  }

  protected _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
}
