export interface Worth<T> {
  worth: number /* worth in millions of the comparator we're talking about */;
  data: T;

  worthInCoins?: number;
}
