export interface Stock {
  adjClose?: number;
  change?: number;
  changeOverTime?: number;
  changePercent?: number;
  earningsDate?: Date;
  label?: string; 
  unadjustedVolume?: number;
  vwap?: number;
  // "Main" props returned by fmpcloud.io for charting
  close: number; 
  date: Date;
  low: number; 
  open: number;
  high: number;
  volume: number;
}

export interface Earnings {
  daysBefore: Date;
  daysAfter: Date;
  eps: number;
  date: Date;
  epsEstimated: number;
  revenue: number;
  revenueEstimated: number;
  symbol: string;
  time: string;
}

export interface EarningsVibe {
  earnings: Earnings;
  stock: Stock[];
}

export interface CustomError {
  message: string;
  status: number;
}

export enum BeforeOrAfter {
  before,
  after
}

export enum TimePeriod {
  '1min', // = '1min',
  '5min', // = '5min',
  '15min', // = '15min',
  '30min', // = '30min',
  '1hour', // = '1hour'
}