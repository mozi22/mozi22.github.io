import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '@models/interfaces/coingecko/Coin';
import { IService } from '@models/interfaces/general/IService';
import { PresidentialCandidates } from '@models/interfaces/scrapped/PresidentialCandidates';
import { HelperService } from '@services/helper.service';

@Component({
  selector: 'app-presidential-candidates',
  templateUrl: './presidential-candidates.component.html',
  styleUrls: ['./presidential-candidates.component.scss'],
})
export class PresidentialCandidatesComponent implements OnInit {
  @Input() public dataService!: IService<PresidentialCandidates>;
  @Input() public coinData!: Coin;

  constructor(public helperService: HelperService) {}

  ngOnInit(): void {
    this.dataService.setupSEOTags();
  }
}
