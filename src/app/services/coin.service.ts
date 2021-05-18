import { Injectable } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { Coins } from '@models/types/Coins';
import { Fiats } from '@models/types/Fiats';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoingeckoService } from './coingecko.service';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private readonly BTC_CALL_WAIT: number = 30000;
  private readonly _supportedCoin: Coin[] = [
    {
      name: 'bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      color: '#f7931a',
      price: 1,
    },
    {
      name: 'ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      color: '#464b76',
      price: 1,
    },
    {
      name: 'cardano',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860',
      color: '#1032ad',
      price: 1,
    },
    {
      name: 'binancecoin',
      image: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
      price: 1,
      color: '#f3ba30',
    },
    {
      name: 'ripple',
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
      price: 1,
      color: '#434c54',
    },
    {
      name: 'polkadot',
      image: 'https://assets.coingecko.com/coins/images/12171/large/aJGBjJFU_400x400.jpg?1597804776',
      price: 1,
      color: '#2e2e2e',
    },
    {
      name: 'litecoin',
      image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580',
      price: 1,
      color: '#838383',
    },
    {
      name: 'chainlink',
      image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700',
      price: 1,
      color: '#335dd2',
    },
    {
      name: 'stellar',
      image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157',
      price: 1,
      color: '#000000',
    },
  ];

  private _coins$: BehaviorSubject<Coin[]> = new BehaviorSubject(this._supportedCoin as Coin[]);
  private _TIME_INTERVALID: number;

  constructor(private _coingeckoService: CoingeckoService) {
    const self = this;

    this._TIME_INTERVALID = window.setInterval(() => {
      self.observeCoinPrices();
    }, this.BTC_CALL_WAIT);
  }

  public get supportedCoins(): Coin[] {
    return this._supportedCoin;
  }

  public async observeCoinPrices(): Promise<void> {
    const coinPrices: Record<Coins, Record<Fiats, number>> = await this._coingeckoService.getCoinPrice(
      this._supportedCoin.map((x) => x.name),
    );

    for (const [key, value] of Object.entries(coinPrices)) {
      this.setCoinPrice(key, value.usd);
    }

    this._coins$.next(this._supportedCoin);
  }
  public get coins(): Observable<Coin[]> {
    return this._coins$.asObservable();
  }

  public get intervalID(): number {
    return this._TIME_INTERVALID;
  }

  private setCoinPrice(coinId: string, newPrice: number): void {
    this._supportedCoin.forEach((coin: Coin) => {
      coin.price = coin.name === coinId ? newPrice : coin.price;
    });
  }
}
