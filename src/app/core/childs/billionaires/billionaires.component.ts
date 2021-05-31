import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-billionaires',
  templateUrl: './billionaires.component.html',
  styleUrls: ['./billionaires.component.scss'],
})
export class BillionairesComponent implements OnInit {
  @Input() public dataService!: IService<Billionaire>;
  @Input() public coinData!: Coin;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {
    this.dataService.setupSEOTags();
  }
}
