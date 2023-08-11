const { getListingsPaginiationsList } = require('./pagesScraper');
const { getListingdata } = require('./listingScraper');
const {get} = require("axios");
const cheerio = require("cheerio");
const dJSON = require("dirty-json");
const JsonFind = require("json-find");
const axios = require("axios");
const { workerData, parentPort } = require('worker_threads');

let converter = require('json-2-csv');
const { appendFile, readFileSync} = require("fs");
const {getListingReviews, getListingPriceAndReviews} = require("./listingReviewsScraper");
const {saveResult} = require("./utils");


const checkScrapedData = async (arr,path) => {
    const data = readFileSync(`${path}/listings.csv`, {encoding: 'utf-8'});
    if(data === ''){
        return arr;
    }
    let convertedData = await converter.csv2json(data, {delimiter: {field: ';'}});
    convertedData = convertedData.map(c => c.listingId);
    return arr.filter(x => !convertedData.some(c => c==x));
}

exports.scrapeListingsByState = async (baseUrl, path, state) => {
    try {
        console.log(`Start gathering listings pages for ${state}...`)
        const pages = await getListingsPaginiationsList(baseUrl);

        console.log(`Listings pages ready for ${state}, start to scrape...`);

        let listings = [];
        for(let page of pages) {

                const res = await axios(page);

                const $ = cheerio.load(res.data);

                let json = dJSON.parse($("script[id='data-deferred-state']").text());
                json = json["niobeMinimalClientData"][0][1].data.presentation;

                const doc = JsonFind(json);

                const {staysInViewport} = doc.findValues('staysInViewport');

                listings = listings.concat(staysInViewport.map(el => el.listingId));
        }
        listings = listings.filter((item, index) => listings.indexOf(item) === index);

        let newListings = await checkScrapedData(listings,path);
        console.log(newListings.length+` listings for ${state} ready to scrape...`)
        let i = 0;

        for(let listingId of newListings){
            try {
                console.log(`Start with ${state}: `, `https://www.airbnb.com/rooms/${listingId}`);
                const listingDetails = await getListingdata(`https://www.airbnb.com/rooms/${listingId}`);
                const {price, reviews} = await getListingPriceAndReviews(`${listingId}`, path);

                let l = [{scrapedAt: (new Date()).toUTCString(),listingId, ...listingDetails}];
                let r = reviews;
                let p = [price];
                i++;

                await Promise.all([
                    await saveResult(l,path+"/listings.csv",';url'),
                    await saveResult(p,path+"/prices.csv",';floatValue'),
                    ...r.map( async review => await saveResult(review,path+"/reviews.csv",';month'))
                ])

                console.log(`${i}/${newListings.length} ${state} Successfully "` + listingId + `" Scraped`);
            }catch (e) {
                console.log(e);
            }
        }

        console.log(`${state} Finish Successfully!`)
    }catch (e) {
        console.log(e);
    }
}

