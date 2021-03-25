export interface StockData {
  // Optional
  adjClose?: number;
  change?: number;
  changeOverTime?: number;
  changePercent?: number;
  earningsDate?: Date;
  label?: string; 
  unadjustedVolume?: number;
  vwap?: number;
  // Required
  close: number; 
  date: Date;
  low: number; 
  open: number;
  high: number;
  volume: number;
}

export interface EarningsData {
  // Optional
  daysBefore?: Date;
  daysAfter?: Date;
  eps?: number;
  // Required
  date: Date;
  epsEstimated: number;
  revenue: number;
  revenueEstimated: number;
  symbol: string;
  time: string;
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