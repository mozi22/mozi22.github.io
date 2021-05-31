import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Crypto } from '@models/interfaces/scrapped/Crypto';
import { HelperService } from '@services/helper.service';
import { CryptoService } from '@services/table/crypto.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
  providers: [CryptoService],
})
export class CryptoComponent implements OnInit {
  @Input() public dataService!: IService<Crypto>;
  @Input() public coinData!: Coin;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {
    this.dataService.setupSEOTags();
  }
}
