import { Athlete } from '@models/interfaces/scrapped/Athlete';
import { Billionaire } from '@models/interfaces/scrapped/Billionaire';
import { Blog } from '@models/interfaces/scrapped/Blog';
import { Car } from '@models/interfaces/scrapped/Car';
import { Country } from '@models/interfaces/scrapped/Country';
import { Crypto } from '@models/interfaces/scrapped/Crypto';
import { House } from '@models/interfaces/scrapped/House';
import { Nba } from '@models/interfaces/scrapped/Nba';
import { PresidentialCandidates } from '@models/interfaces/scrapped/PresidentialCandidates';
import { Snp500 } from '@models/interfaces/scrapped/Snp500';
import { Wealthy } from '@models/interfaces/scrapped/Wealthy';

export type ScrappedTypes =
  | Billionaire
  | Athlete
  | Country
  | Car
  | House
  | Snp500
  | Crypto
  | Wealthy
  | Nba
  | PresidentialCandidates
  | Blog;
