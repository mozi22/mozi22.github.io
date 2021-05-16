import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Country } from '@models/interfaces/scrapped/Country';
import { Car } from '../scrapped/Car';
import { House } from '../scrapped/House';

export interface ScrappedTypesMapper {
  billionaire: Billionaire;
  athlete: Athlete;
  country: Country;
  car: Car;
  house: House;
}
