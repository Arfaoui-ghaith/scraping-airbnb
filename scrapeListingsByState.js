const { getListingsPaginiationsList } = require('./pagesScraper');
const { getListingdata } = require('./listingScraper');
const cheerio = require("cheerio");
const dJSON = require("dirty-json");
const JsonFind = require("json-find");
const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
let converter = require('json-2-csv');
const {getListingPriceAndReviews} = require("./listingReviewsScraper");
const {saveResult, puppeteerCall} = require("./utils");

const checkScrapedData = async (arr,path) => {
    const data = readFileSync(`${path}/listings.csv`, {encoding: 'utf-8'});
    if(data === ''){
        return arr;
    }
    let convertedData = await converter.csv2json(data, {delimiter: {field: ';'}});
    convertedData = convertedData.map(c => c.listingId);
    return arr.filter(x => !convertedData.some(c => c==x));
}

const checkResultPath = (path) => {
    if (!existsSync(path)) {
        mkdirSync(path, {recursive: true});
    }
    if (!existsSync(path+"/listings.csv")) {
        writeFileSync(path+"/listings.csv",'',{ encoding: 'utf-8' });
    }
    if (!existsSync(path+"/prices.csv")) {
        writeFileSync(path+"/prices.csv",'',{ encoding: 'utf-8' });
    }
    if (!existsSync(path+"/reviews.csv")) {
        writeFileSync(path+"/reviews.csv",'',{ encoding: 'utf-8' });
    }
}

exports.scrapeListingsByState = async (baseUrl, path, state, city) => {
    try {
        checkResultPath(path);
        console.log(`Start gathering listings pages for ${city} - ${state}...`)
        const pages = await getListingsPaginiationsList(baseUrl);

        console.log(`Listings pages ready for ${state}, start to scrape...`);

        let listings = [];
        for(let page of pages) {

                const res = await puppeteerCall(page);

                const $ = cheerio.load(res.data);

                let json = dJSON.parse($("script[id='data-deferred-state']").text());
                json = json["niobeMinimalClientData"][0][1].data.presentation;

                const doc = JsonFind(json);

                const {staysInViewport} = doc.findValues('staysInViewport');

                listings = listings.concat(staysInViewport.map(el => el.listingId));
        }
        listings = listings.filter((item, index) => listings.indexOf(item) === index);

        let newListings = await checkScrapedData(listings,path);
        console.log(newListings.length+` listings for ${city} - ${state} ready to scrape...`)

        let i = 0;
        for(let listingId of newListings){
            try {
                const res = await puppeteerCall(`https://www.airbnb.com/rooms/${listingId}/reviews`,{
                    waitUntil: 'networkidle0'
                });
                console.log(`Start with ${state}: `, `https://www.airbnb.com/rooms/${listingId}`);
                const listingDetails = await getListingdata(res);
                const {price, reviews} = await getListingPriceAndReviews(res,`${listingId}`);

                let l = [{scrapedAt: (new Date()).toUTCString(),listingId, ...listingDetails}];
                let r = reviews;
                let p = [price];
                i++;

                await Promise.all([
                    await saveResult(l,path+"/listings.csv",';url'),
                    await saveResult(p,path+"/prices.csv",';floatValue'),
                    ...r.map( async review => await saveResult(review,path+"/reviews.csv",';month'))
                ])

                console.log(`${i}/${newListings.length} ${city} - ${state} Successfully "` + listingId + `" Scraped`);
            }catch (e) {
                console.log(e);
            }
        }

        console.log(`${state} Finish Successfully!`)
        return 1;
    }catch (e) {
        console.log(e);
        return 0;
    }
}

