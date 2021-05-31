import { defaultENV } from './environment.default';

export const environment = {
  production: true,
  base: 'https://ourworldincrypto.com',
  ...defaultENV,
};
