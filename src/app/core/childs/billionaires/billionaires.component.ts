import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Country } from '@models/interfaces/scrapped/Country';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-billionaires',
  templateUrl: './billionaires.component.html',
  styleUrls: ['./billionaires.component.scss'],
})
export class BillionairesComponent implements OnInit {
  @Input() public dataService!: IService<Country>;
  @Input() public coinData!: Coin;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {}
}
