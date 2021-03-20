interface StockData {
  date: Date;
  open: number;
  high: number; // 45.6675;
  low: number; // 44.842499;
  close: number; // 45.227501;
  adjClose: number; // 44.365974;
  volume: number; // 129870400;
  unadjustedVolume: number; // 129870400;
  change: number; // 0.2275;
  changePercent: number; // 0.506;
  vwap: number; // 45.24583;
  label: string; // March 12; 19;
  changeOverTime: number; // 0.00506;
}

enum BeforeOrAfter {
  "before",
  "after"
}