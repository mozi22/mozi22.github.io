import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Car } from '@models/interfaces/scrapped/Car';
import { Country } from '@models/interfaces/scrapped/Country';
import { Crypto } from '@models/interfaces/scrapped/Crypto';
import { House } from '@models/interfaces/scrapped/House';
import { Snp500 } from '@models/interfaces/scrapped/Snp500';
import { Wealthy } from '@models/interfaces/scrapped/Wealthy';

export type ScrappedTypes = Billionaire | Athlete | Country | Car | House | Snp500 | Crypto | Wealthy;
