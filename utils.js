const converter = require("json-2-csv");
const {appendFile, readFileSync} = require("fs");
const {launch} = require("puppeteer");


exports.saveResult = async (data,path,separator) => {
    let condition = readFileSync(path, {encoding: 'utf-8'}) === '';
    if(condition) {
        const listingsDetails = await converter.json2csv(data, {delimiter: {field: ';'}});
        appendFile(path, listingsDetails, function (err) {
            if (err) return console.log(err);

        });
    }else {
        const listingsDetails = await converter.json2csv(data, {delimiter: {field: ';'}});
        appendFile(path, listingsDetails.split(separator)[1], function (err) {
            if (err) return console.log(err);

        });
    }
}

exports.puppeteerCall = async (url,args) => {
    const browser = await launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url+"", args);

    const html = await page.content();
    await browser.close();
    return {data: html};
}