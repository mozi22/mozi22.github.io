import { CountryWiseData } from './CountryWiseData';

export interface CoinDetails {
  id: number;
  symbol: string;
  name: string;
  asset_platform_id: number;

  platforms: [];

  categories: string[];
  public_notice: string;
  additional_notices: string[];
  localization: CountryWiseData;
  description: CountryWiseData;

  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: string;
    telegram_channel_identifier: string;
    subreddit_url: string;
  };

  repos_url: {
    github: string[];
    bitbucket: string[];
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };

  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    current_price: CountryWiseData;
    total_value_locked: number;
    mcap_to_tvl_ratio: number;
    fdv_to_tvl_ratio: number;
    roi: number;
    ath: CountryWiseData;
    ath_change_percentage: CountryWiseData;
    ath_date: CountryWiseData;
    atl: CountryWiseData;
    atl_change_percentage: CountryWiseData;
    atl_date: CountryWiseData;
    market_cap: CountryWiseData;
    market_cap_rank: number;
    fully_diluted_valuation: CountryWiseData;
    total_volume: CountryWiseData;
    high_24h: CountryWiseData;
    low_24h: CountryWiseData;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: CountryWiseData;
    price_change_percentage_1h_in_currency: CountryWiseData;
    price_change_percentage_24h_in_currency: CountryWiseData;
    price_change_percentage_7d_in_currency: CountryWiseData;
    price_change_percentage_14d_in_currency: CountryWiseData;
    price_change_percentage_30d_in_currency: CountryWiseData;
    price_change_percentage_60d_in_currency: CountryWiseData;
    price_change_percentage_200d_in_currency: CountryWiseData;
    price_change_percentage_1y_in_currency: CountryWiseData;
    market_cap_change_24h_in_currency: CountryWiseData;
    market_cap_change_percentage_24h_in_currency: CountryWiseData;

    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: string;
  };

  community_data: {
    facebook_likes: number;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: number;
  };

  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;

    code_additions_deletions_4_weeks: {
      additions: number;
      deletions: number;
    };

    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: number[];
  };

  public_interest_stats: {
    alexa_rank: number;
    bing_matches: number;
  };
  status_updates: [
    {
      last_updated: string;
    },
  ];

  tickers: [
    {
      base: string;
      target: string;
      market: {
        name: string;
        identifier: string;
        has_trading_incentive: boolean;
      };
      last: number;
      volume: number;
      converted_last: {
        eth: number;
        btc: number;
        usd: number;
      };
      converted_volume: {
        eth: number;
        btc: number;
        usd: number;
      };
      trust_score: string;
      bid_ask_spread_percentage: number;
      timestamp: string;
      last_traded_at: string;
      last_fetch_at: string;
      is_anomaly: boolean;
      is_stale: boolean;
      trade_url: string;
      token_info_url: string;
      coin_id: string;
      target_coin_id: string;
    },
  ];

  block_time_in_minutes: number;
  hashing_algorithm: string;

  market_cap: {
    usd: number;
  };
}
