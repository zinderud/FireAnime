var fs = require('fs');
var Nightmare = require('nightmare');
var argv = require('yargs').argv;
import * as cheerio from 'cheerio';



var LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./localStroage');



var options = [];




class Facebook {
    nightmare;
    constructor() {


        let v = localStorage.getItem(argv._[2]);
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


    async run() {
        this.log("facebook begin: " + argv._[2]);
        await this.login();
        await this.post();
        await this.end();
        this.log("facebook end");
    }

    async login() {
        // console.log("login()");
        let html = await this.nightmare.goto("https://m.facebook.com")
            .wait('[name="email"]')
            .type('[name="email"]', argv._[0])
            .type('[name="pass"]', argv._[1])
            .click('[name="login"]')
            .wait('img[alt*="Nam"]') // wait until facebook "Log in With One Tap"
            .evaluate(() => {
                return document.querySelector('html').innerHTML;
            })
            .then(html => html);

        const $body = cheerio.load(html)('body');
        // console.log($body.text());

        let txt = $body.find('input[type="submit"]').val();
        if (txt == 'OK') {
            // this.nightmare.click('input[type="submit"]');
            this.log("login success");
        }



        return;
    }

    async post() {
        // console.log('post()');
        let html = await this.nightmare
            .goto(argv._[2])
            // .wait(3000)
            .wait('textarea')
            // .wait(3000)
            .type('textarea', 'http://www.yeniasya.com.tr/ekonomi/borsa-dan-yeni-rekor-108-bini-asti_439105')
            // .wait(2500)
            .click('[name="view_post"]')
            .wait(3000)
            .evaluate(() => {
                return document.querySelector('html').innerHTML;
            })
            .then(html => html);

        const $body = cheerio.load(html)('body');
        // console.log($body.text());


        if ($body.find('[role="article"] > h3 > a')) {
            let txt = $body.find('[role="article"] > h3 > a').text();
            console.log("text: ", txt);
            if ( txt.indexOf("You have ") != -1 ) {
                this.log("facebook post success but pending.");
                localStorage.setItem(argv._[2], this.today());
            }
        }
        else if ($body.find('abbr')) {
            let txt = $body.find('abbr').eq(0).text();
            if (txt == 'Just now') {
                this.log("facebook post success.");
                localStorage.setItem(argv._[2], this.today());
            }
        }
        




    }

    async end() {
        // console.log("end()");
        return this.nightmare.end().then(() => { });
    }

    log(msg) {
        if (typeof msg !== 'string' && typeof msg !== 'number') {
            msg = JSON.stringify(msg);
        }
        let dt = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')     // delete the dot and everything after
        fs.appendFileSync('auto-post.log', `[${dt}] ${msg}` + "\n");
    }


    today() {
        let d = new Date();
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

}


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