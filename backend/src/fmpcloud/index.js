"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var got_1 = __importDefault(require("got"));
var utils_1 = require("../utils");
var FMPCloud = /** @class */ (function () {
    function FMPCloud(apikey) {
        var _this = this;
        if (apikey === void 0) { apikey = ''; }
        this._baseURL = 'https://fmpcloud.io/api/v3';
        this._apiKey = '';
        this._formatDateString = function (date) {
            if (date === void 0) { date = Date.now(); }
            var x = new Date(date);
            var year = x.getFullYear();
            var month = x.getMonth() + 1;
            var day = x.getDate();
            return year + "-" + month + "-" + day;
        };
        this.CompanyProfile = function (symbol) {
            if (symbol === void 0) { symbol = ''; }
            return __awaiter(_this, void 0, void 0, function () {
                var a, b, s, u, r, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            a = this._apiKey;
                            b = this._baseURL;
                            s = symbol.toUpperCase();
                            u = b + "/profile/" + s + "?apikey=" + a;
                            return [4 /*yield*/, got_1.default(u)];
                        case 1:
                            r = _a.sent();
                            return [2 /*return*/, JSON.parse(r.body)];
                        case 2:
                            e_1 = _a.sent();
                            console.log('Error : CompanyProfile : ', e_1);
                            throw e_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.HistoricalEarnings = function (symbol, numberOfPriorEarnings) { return __awaiter(_this, void 0, void 0, function () {
            var l, b, a, s, u, r, earnings, finalEarnings, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        l = numberOfPriorEarnings;
                        b = this._baseURL;
                        a = this._apiKey;
                        s = symbol.toUpperCase();
                        u = b + "/historical/earning_calendar/" + s + "?limit=" + l + "&apikey=" + a;
                        return [4 /*yield*/, got_1.default(u)];
                    case 1:
                        r = _a.sent();
                        earnings = JSON.parse(r.body);
                        finalEarnings = earnings.map(function (e) {
                            var d = new Date(e.date);
                            var y = d.getFullYear();
                            var b = utils_1.getRelativeDate(BeforeOrAfter.before, 60, d);
                            var a = utils_1.getRelativeDate(BeforeOrAfter.after, 60, d);
                            return __assign({ year: y, daysBefore: b, daysAfter: a }, e);
                        });
                        return [2 /*return*/, finalEarnings];
                    case 2:
                        e_2 = _a.sent();
                        console.log('Error : HistoricalEarnings : ', e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get historical stock info
         * @param {String} symbol stock ticker symbol
         * @param {Date} startDate starting date range
         * @param {Date} endDate ending date range
         * @param {String} timePeriod must be one of: ("1min"|"5min"|"15min"|"30min"|"1hour"|"1day")
         */
        this.HistoricalStock = function (symbol, startDate, endDate, metadata, timePeriod // must be one of: ("1min"|"5min"|"15min"|"30min"|"1hour"|"1day")
        ) {
            if (startDate === void 0) { startDate = Date.now(); }
            if (endDate === void 0) { endDate = Date.now(); }
            if (metadata === void 0) { metadata = {}; }
            if (timePeriod === void 0) { timePeriod = '1day'; }
            return __awaiter(_this, void 0, void 0, function () {
                var allowedTimePeriods, m, b, a, s, e, url, res, json, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allowedTimePeriods = [
                                '1day',
                                '1min',
                                '5min',
                                '15min',
                                '30min',
                                '1hour'
                            ];
                            if (!allowedTimePeriods.includes(timePeriod)) {
                                m = "timePeriod not allowed!\n\tgot '" + JSON.stringify(timePeriod) + "'\n\texpected one of : '" + allowedTimePeriods + "'";
                                throw new Error(m);
                            }
                            // This check is important. If you want a 1day chart, you leave the param
                            // empty (that's just how fmpcloud takes it)...
                            if (timePeriod === '1day') {
                                timePeriod = '';
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            b = this._baseURL;
                            a = this._apiKey;
                            s = this._formatDateString(startDate);
                            e = this._formatDateString(endDate);
                            url = b + "/historical-price-full/" + symbol + "?from=" + s + "&to=" + e + "&apikey=" + a;
                            return [4 /*yield*/, got_1.default(url)];
                        case 2:
                            res = _a.sent();
                            json = JSON.parse(res.body);
                            return [2 /*return*/, (json.historical &&
                                    json.historical.length &&
                                    json.historical.map(function (h) {
                                        var c = __assign(__assign({}, h), { percentChange: h.changePercent, date: new Date(h.date) });
                                        delete c.changePercent; // remove changePercent prop
                                        return __assign(__assign({}, c), metadata); // combine metadata with final object
                                    }))];
                        case 3:
                            err_1 = _a.sent();
                            console.log("Error : [HistoricalStock] : " + err_1);
                            throw err_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        this.VibeCheck = function (symbol, yearsAgo) {
            if (symbol === void 0) { symbol = ''; }
            if (yearsAgo === void 0) { yearsAgo = 1; }
            return __awaiter(_this, void 0, void 0, function () {
                var earnings, stockdataRequests, stockdataRaw_1, e_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.HistoricalEarnings(symbol, yearsAgo)];
                        case 1:
                            earnings = _a.sent();
                            console.log('got earnings', { earnings: earnings });
                            stockdataRequests = earnings.map(function (e) {
                                return _this.HistoricalStock(symbol, e.daysBefore, e.daysAfter, {}, '1min', {
                                    earningsDate: e.date
                                });
                            });
                            return [4 /*yield*/, Promise.all(stockdataRequests)];
                        case 2:
                            stockdataRaw_1 = _a.sent();
                            console.log('got stockdataRaw');
                            return [2 /*return*/, earnings.map(function (e) {
                                    var stockdata = 'Stock data not found';
                                    stockdataRaw_1.forEach(function (sdr) {
                                        // Since we get a couple days before and after earnings (so an array of stock data) it doesn't
                                        // matter which element in the array we check the earningsDate prop on, since each element will
                                        // have the same earningsDate prop. We add the earningsDate prop to the object received from
                                        // fmpcloud.io.
                                        if (sdr.length > 0 && sdr[0].earningsDate === e.date) {
                                            stockdata = sdr;
                                        }
                                    });
                                    return __assign(__assign({}, e), { stockData: stockdata });
                                })];
                        case 3:
                            e_3 = _a.sent();
                            console.log("Error : [VibeCheck] : " + e_3);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        if (apikey !== '') {
            this._apiKey = apikey;
        }
        else {
            if (process.env.FMPCLOUD_API_KEY) {
                this._apiKey = process.env.FMPCLOUD_API_KEY;
            }
        }
    }
    return FMPCloud;
}());
exports.default = FMPCloud;
;
