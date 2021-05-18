import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Country } from '@models/interfaces/scrapped/Country';
import { Car } from '../scrapped/Car';
import { Crypto } from '../scrapped/Crypto';
import { House } from '../scrapped/House';
import { Snp500 } from '../scrapped/Snp500';

export interface ScrappedTypesMapper {
  billionaire: Billionaire;
  athlete: Athlete;
  country: Country;
  car: Car;
  house: House;
  snp500: Snp500;
  crypto: Crypto;
}
