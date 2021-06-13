import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { CoinService } from '@services/coin.service';

declare const jQuery: any;

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss'],
})
export class TitleHeaderComponent implements OnInit, OnChanges {
  @Input() public coinData!: Coin;
  @Input() public title: string = '';
  @Input() public description: string = '';
  @Input() public cover: string = '';
  @Input() public featureEnabled: boolean | undefined = true;

  @Output() selectedCoin = new EventEmitter<number>();

  private readonly COUNTER_CHANGE_COLOR: string[] = ['#6eaf0f', '#e1191d'];

  constructor(private _coinService: CoinService) {}
  ngOnChanges(changes: SimpleChanges): void {
    const selectedColor =
      changes.coinData?.currentValue?.price >= changes.coinData?.previousValue?.price
        ? this.COUNTER_CHANGE_COLOR[0]
        : this.COUNTER_CHANGE_COLOR[1];
    jQuery('.btc-value-wrapper')
      .animate({ backgroundColor: selectedColor, color: 'white' }, 500)
      .delay(500)
      .animate({ backgroundColor: 'white', color: 'black' }, 500);

    jQuery('.coin-price').animate({ color: 'white' }, 500).delay(500).animate({ color: 'black' }, 500);
  }

  ngOnInit(): void {}

  private updateDropDown(idx: number): void {
    this.coinData = this._coinService.supportedCoins[idx];
  }

  public changeCoin(idx: number) {
    this.selectedCoin.emit(idx);
    this.updateDropDown(idx);
  }

  public get coins(): Coin[] {
    return this._coinService.supportedCoins;
  }
}
