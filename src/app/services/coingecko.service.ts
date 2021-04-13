import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoinDetails } from '@models/interfaces/coingecko/CoinDetails';
import { Coins } from '@models/types/Coins';
import { Fiats } from '@models/types/Fiats';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CoingeckoService {
  private readonly _coingecko_url = environment.coingecko.api_base;

  constructor(private http: HttpClient) {}

  public async getCoinDetails(coinName: string): Promise<CoinDetails> {
    return await this.http.get<CoinDetails>(`${this._coingecko_url}/coins/${coinName}`, {}).toPromise();
  }

  public calculateCoinFromMC(targetCoinPrice: number, targetCoinMC: number, selectedCoinMC: number): number {
    return (targetCoinPrice / targetCoinMC) * selectedCoinMC;
  }

  public async getCoinPrice(coinList: string[]): Promise<Record<Coins, Record<Fiats, number>>> {
    return await this.http
      .get<Record<Coins, Record<Fiats, number>>>(
        `${this._coingecko_url}/simple/price?ids=${coinList.join(',')}&vs_currencies=usd`,
        {},
      )
      .toPromise();
  }
}
