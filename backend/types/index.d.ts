interface StockData {
  date: Date;
  earningsDate?: Date;
  open: number;
  high: number; // 45.6675;
  low: number; // 44.842499;
  close: number; // 45.227501;
  adjClose?: number; // 44.365974;
  volume: number; // 129870400;
  unadjustedVolume?: number; // 129870400;
  change?: number; // 0.2275;
  changePercent: number; // 0.506;
  vwap: number; // 45.24583;
  label: string; // March 12; 19;
  changeOverTime: number; // 0.00506;
}

interface EarningsData {
  date: Date; // 2021-04-28,
  symbol: string; //  AAPL,
  eps?: number; // null,
  epsEstimated: number; // 0.98,
  time: string; // bmo,
  revenue: number; // 0,
  revenueEstimated: number; // 76920700000
  daysBefore?: Date;
  daysAfter?: Date;
}

enum BeforeOrAfter {
  before,
  after
}

enum TimePeriod {
  'OneMinute' = '1min',
  'FiveMinutes' = '5min',
  'FifteenMinutes' = '15min',
  'ThirtyMinutes' = '30min',
  'OneHour' = '1hour'
}
