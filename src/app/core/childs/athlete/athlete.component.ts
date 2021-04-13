import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { Country } from '@models/interfaces/scrapped/Country';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-athletes',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss'],
})
export class AthleteComponent implements OnInit {
  @Input() public dataService!: IService<Country>;
  @Input() public coinData!: Coin;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {}
}
