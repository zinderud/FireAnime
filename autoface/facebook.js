"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
var fs = require('fs');
var Nightmare = require('nightmare');
var argv = require('yargs').argv;
var cheerio = require("cheerio");
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./localStroage');
var options = [];
var Facebook = (function () {
    function Facebook() {
        var v = localStorage.getItem(argv._[2]);
        if (v == this.today()) {
            this.log("facebook has been posted already for: " + v);
            process.exit();
        }
        this.nightmare = Nightmare({
            show: true,
            openDevTools: { mode: 'detach' },
            typeInterval: 20
        });
        this.nightmare.useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0");
    }
    Facebook.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("facebook begin: " + argv._[2]);
                        return [4 /*yield*/, this.login()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.post()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.end()];
                    case 3:
                        _a.sent();
                        this.log("facebook end");
                        return [2 /*return*/];
                }
            });
        });
    };
    Facebook.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, $body, txt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nightmare.goto("https://m.facebook.com")
                            .wait('[name="email"]')
                            .type('[name="email"]', argv._[0])
                            .type('[name="pass"]', argv._[1])
                            .click('[name="login"]')
                            .wait('img[alt*="Nam"]') // wait until facebook "Log in With One Tap"
                            .evaluate(function () {
                            return document.querySelector('html').innerHTML;
                        })
                            .then(function (html) { return html; })];
                    case 1:
                        html = _a.sent();
                        $body = cheerio.load(html)('body');
                        txt = $body.find('input[type="submit"]').val();
                        if (txt == 'OK') {
                            // this.nightmare.click('input[type="submit"]');
                            this.log("login success");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Facebook.prototype.post = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, $body, txt, txt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nightmare
                            .goto(argv._[2])
                            .wait('textarea')
                            .type('textarea', 'http://www.yeniasya.com.tr/ekonomi/borsa-dan-yeni-rekor-108-bini-asti_439105')
                            .click('[name="view_post"]')
                            .wait(3000)
                            .evaluate(function () {
                            return document.querySelector('html').innerHTML;
                        })
                            .then(function (html) { return html; })];
                    case 1:
                        html = _a.sent();
                        $body = cheerio.load(html)('body');
                        // console.log($body.text());
                        if ($body.find('[role="article"] > h3 > a')) {
                            txt = $body.find('[role="article"] > h3 > a').text();
                            console.log("text: ", txt);
                            if (txt.indexOf("You have ") != -1) {
                                this.log("facebook post success but pending.");
                                localStorage.setItem(argv._[2], this.today());
                            }
                        }
                        else if ($body.find('abbr')) {
                            txt = $body.find('abbr').eq(0).text();
                            if (txt == 'Just now') {
                                this.log("facebook post success.");
                                localStorage.setItem(argv._[2], this.today());
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Facebook.prototype.end = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log("end()");
                return [2 /*return*/, this.nightmare.end().then(function () { })];
            });
        });
    };
    Facebook.prototype.log = function (msg) {
        if (typeof msg !== 'string' && typeof msg !== 'number') {
            msg = JSON.stringify(msg);
        }
        var dt = new Date().toISOString().
            replace(/T/, ' ').
            replace(/\..+/, ''); // delete the dot and everything after
        fs.appendFileSync('auto-post.log', "[" + dt + "] " + msg + "\n");
    };
    Facebook.prototype.today = function () {
        var d = new Date();
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    };
    return Facebook;
}());
// argv._[0] = "sa@sas";
// argv._[1] = "Assa99**,*";
// argv._[2] = "https://m.facebook.com/groups/675918812";
options = argv._;
// console.log(options);
if (options.length < 3) {
    console.log("Input ID, Password, URL !");
}
else {
    (new Facebook()).run();
}
