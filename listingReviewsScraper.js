const cheerio = require("cheerio");
const priceParser = require('price-parser');
const {launch} = require("puppeteer");

let converter = require('json-2-csv');
const { appendFile} = require("fs");

exports.getListingPriceAndReviews = async (res,listingId) => {
    const $ = cheerio.load(res.data);
    const reviews = $("div[class='r1are2x1 dir dir-ltr']").map(function (i, el) {
        return {
            scrapedAt: (new Date()).toUTCString(),
            listingId,
            text: `${$(this).find('span[class="ll4r2nl dir dir-ltr"]').text()}`.replace(';',' '),
            customerId: $(this).find('a').attr('href').split('/').at(-1),
            customerName: $(this).find('h3').text(),
            year: $(this).find('ol').text().split(' ').at(-1),
            month: $(this).find('ol').text().split(' ').at(0)
        }
    }).toArray();


    let {currencyCode,symbol,floatValue} = priceParser.parseFirst(`${$("div[data-testid='book-it-default']").text()}`);


    return {
        reviews,
        price: {scrapedAt: (new Date()).toUTCString(),listingId,currencyCode,symbol,floatValue}
    }
}