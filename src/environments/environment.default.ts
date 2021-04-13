export const defaultENV = {
  SEO: {
    keys: {
      description: 'description',
      keywords: 'keywords',
    },
    static_pages: {
      gdp: {
        title: 'GDP vs Cryptocurrencies',
        keywords:
          'cryptocurrencies, bitcoin, ethereum, crypto, gdp, countries, usa, canada, germany, austria, france, uk, england',
        description: 'How many crypto do you need to become as rich as a country.',
      },
      billionaires: {
        title: 'Billionaires vs cryptocurrencies',
        keywords: 'cryptocurrencies, bitcoin, ethereum, crypto, bill gates, jeff bezos, elon musk, billionaire',
        description: 'How many crypto do you need to become as rich as the richest people in the world.',
      },
      athletes: {
        title: 'Athletes vs cryptocurrencies',
        keywords:
          'cryptocurrencies, bitcoin, ethereum, crypto, roger federer, christiano ronaldo, tiger woods, lebron james, neymar, lionel messi, stephen curry, kevin durrant, kirk cousins, carson wentz',
        description: 'How many crypto do you need to become as rich as the richest athletes in the world.',
      },
    },
  },
  coingecko: {
    api_base: 'https://api.coingecko.com/api/v3',
  },
  routes: {
    gdp: '',
    billionaires: 'billionaires',
    athletes: 'athletes',
  },
};
