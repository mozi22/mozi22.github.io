import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Country } from '@models/interfaces/scrapped/Country';

export interface ScrappedTypesMapper {
  billionaire: Billionaire;
  athlete: Athlete;
  country: Country;
}
