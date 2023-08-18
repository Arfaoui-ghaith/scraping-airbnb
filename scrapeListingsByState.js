const { getListingsPaginiationsList } = require('./pagesScraper');

const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
let converter = require('json-2-csv');

const { extractListingsIds, extractListings} = require("./utils");
const {get} = require("axios");
const { Cluster } = require('puppeteer-cluster');
const puppeteer = require("puppeteer");

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

        console.log(`${pages.length} Listings pages ready for ${state}, start to scrape...`);

        let listings = [];

        let listingsPages = await Promise.all(pages.map(async page => await get(page)))
        let listingsIds = await Promise.all(listingsPages.map(async page => await extractListingsIds(page)));

        for (let ids of listingsIds){
            listings = [...listings, ...ids]
        }

        listings = listings.filter((item, index) => listings.indexOf(item) === index);

        let newListings = await checkScrapedData(listings,path);
        console.log(newListings.length+` listings for ${city} - ${state} ready to scrape...`)

        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 3,
            timeout: 120000,
            monitor: true,
            puppeteerOptions: {
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: "C:/Users/Rjab/IdeaProjects/chrome-win64/chrome",
                defaultViewport: false
            }
        });

        cluster.on("taskerror", (err, data) => {
            console.log(`${data.i}/${data.n} : Error crawling https://www.airbnb.com/rooms/${data.listingId}: ${err.message}`);
        });

        await cluster.task(async ({ page, data: { url, listingId, path, i, n } }) => {
            //console.log(`${i}/${n} : Start with ${city} - ${state}: `, `https://www.airbnb.com/rooms/${listingId}`);
            await page.goto(`https://www.airbnb.com/rooms/${listingId}/reviews`);
            await page.waitForFunction(`document.getElementById("data-deferred-state") != ${null}`);
            let html = await page.content();
            const resDetails = { data: html };
            await page.waitForSelector('._tyxjp1');
            html = await page.content();
            const resExtra = { data: html };
            await extractListings(resDetails, resExtra, listingId, path);
            //console.log(`${i}/${n} : ${city} - ${state} Successfully "` + listingId + `" Scraped`);
        });

        let i=0;
        for(let listingId of newListings){
            i++;
            await cluster.queue({
                url: `https://www.airbnb.com/rooms/${listingId}`,
                listingId,
                path,
                i,
                n: newListings.length
            });
        }

        await cluster.idle();
        await cluster.close();

        console.log(`${city} - ${state} Finish!`)
        return 1;
    }catch (e) {
        console.log(e);
        return 0;
    }
}

