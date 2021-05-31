import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Wealthy } from '@models/interfaces/scrapped/Wealthy';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-wealthy',
  templateUrl: './wealthy.component.html',
  styleUrls: ['./wealthy.component.scss'],
})
export class WealthyComponent implements OnInit {
  @Input() public dataService!: IService<Wealthy>;
  @Input() public coinData!: Coin;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {
    this.dataService.setupSEOTags();
  }
}
