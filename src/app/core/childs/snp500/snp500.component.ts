import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Snp500 } from '@models/interfaces/scrapped/Snp500';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-snp500',
  templateUrl: './snp500.component.html',
  styleUrls: ['./snp500.component.scss'],
})
export class Snp500Component implements OnInit {
  @Input() public dataService!: IService<Snp500>;
  @Input() public coinData!: Coin;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {
    this.dataService.setupSEOTags();
  }
}
