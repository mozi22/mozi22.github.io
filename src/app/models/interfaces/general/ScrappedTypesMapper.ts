import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Country } from '@models/interfaces/scrapped/Country';
import { Car } from '../scrapped/Car';

export interface ScrappedTypesMapper {
  billionaire: Billionaire;
  athlete: Athlete;
  country: Country;
  car: Car;
}
