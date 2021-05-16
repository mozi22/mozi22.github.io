import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IService } from '@models/interfaces/general/IService';
import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Country } from '@models/interfaces/scrapped/Country';
import { SeoService } from './seo.service';
import { AthleteService } from './table/athlete.service';
import { BillionaireService } from './table/billionaire.service';
import { CarService } from './table/car.service';
import { GdpService } from './table/gdp.service';
import { HouseService } from './table/house.service';

@Injectable({
  providedIn: 'root',
})
export class FactoryService {
  constructor(private _pipe: DecimalPipe, private _seoService: SeoService) {}

  public getComparisonService(routeUrl: string): IService<Country | Billionaire | Athlete> {
    switch (routeUrl) {
      case `/${environment.routes.gdp}`:
        return new GdpService(this._pipe, this._seoService);
      case `/${environment.routes.billionaires}`:
        return new BillionaireService(this._pipe, this._seoService);
      case `/${environment.routes.athletes}`:
        return new AthleteService(this._pipe, this._seoService);
      case `/${environment.routes.cars}`:
        return new CarService(this._pipe, this._seoService);
      case `/${environment.routes.houses}`:
        return new HouseService(this._pipe, this._seoService);
      default:
        return new GdpService(this._pipe, this._seoService);
    }
  }
}
