import { Worth } from './Worth';

export interface ScrappedData<T> {
  date: string;
  data: Worth<T>[];
}
