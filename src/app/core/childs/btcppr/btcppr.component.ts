import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-btcppr',
  templateUrl: './btcppr.component.html',
  styleUrls: ['./btcppr.component.scss'],
})
export class BtcpprComponent implements OnInit {
  @Input() public dataService!: IService<any>;
  @Input() public coinData!: Coin;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {
    this.dataService.setupSEOTags();
  }
}
