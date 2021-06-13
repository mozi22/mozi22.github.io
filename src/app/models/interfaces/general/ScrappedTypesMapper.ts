import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Country } from '@models/interfaces/scrapped/Country';
import { Blog } from '../scrapped/Blog';
import { Car } from '../scrapped/Car';
import { Crypto } from '../scrapped/Crypto';
import { House } from '../scrapped/House';
import { Nba } from '../scrapped/Nba';
import { PresidentialCandidates } from '../scrapped/PresidentialCandidates';
import { Snp500 } from '../scrapped/Snp500';
import { Wealthy } from '../scrapped/Wealthy';

export interface ScrappedTypesMapper {
  billionaire: Billionaire;
  athlete: Athlete;
  country: Country;
  car: Car;
  house: House;
  snp500: Snp500;
  crypto: Crypto;
  wealthy: Wealthy;
  nba: Nba;
  presidentialCandidates: PresidentialCandidates;
  btcppr: Blog;
}
