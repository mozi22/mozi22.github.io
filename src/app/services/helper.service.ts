import { Injectable } from '@angular/core';
import millify from 'millify';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public toString(num: number): string {
    return num.toString();
  }

  public millifyTitle(worth: number | undefined): string {
    if (!worth) return '';

    return millify(worth, {
      precision: 2,
    });
  }
}
