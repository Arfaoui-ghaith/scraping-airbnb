const converter = require("json-2-csv");
const {appendFile, readFileSync} = require("fs");


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