const cheerio = require("cheerio");
const dJSON = require('dirty-json');
const JsonFind = require("json-find");
const {get} = require("axios");

exports.getListingsPaginiationsList = async (url) => {
    const res = await get(url);

    const $ = cheerio.load(res.data);

    let json = dJSON.parse($("script[id='data-deferred-state']").text());
    json = json["niobeMinimalClientData"][0][1].data.presentation;

    const doc = JsonFind(json);

    const {pageCursors} = doc.findValues('pageCursors');
    const {federatedSearchSessionId} = doc.findValues('federatedSearchSessionId')

    const params = {
        pagination_search: true,
        search_type: 'unknown',
        channel: 'EXPLORE'
    }

    return pageCursors.map(cursor => {
        return {
            url: url,
            method: 'get',
            params: {
                ...params,
                federated_search_session_id: federatedSearchSessionId,
                cursor
            }
        }
    });
}