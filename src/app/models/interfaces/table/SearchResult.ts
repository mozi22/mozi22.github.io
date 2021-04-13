import { Worth } from '../scrapped/Worth';

export interface SearchResult<T> {
  tableData: Worth<T>[];
  total: number;
}
