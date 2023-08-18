const { scrapeListingsByState } = require('./scrapeListingsByState');
const sequmise = require('sequmise')

const geo = require('countrycitystatejson');
const urlBaseNorthCarolina	 = "https://www.airbnb.com/s/North-Carolina--United-States/homes"
const resultPathNorthCarolina	 = '../states/north carolina';

const states = ['Alaska', 'Alabama', 'Arizona', 'Arkansas', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
    'Nevada', 'New-Hampshire', 'New-Jersey', 'New-Mexico', 'New-York', 'North-Carolina', 'North-Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode-Island', 'South-Carolina', 'South-Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West-Virginia', 'Wisconsin', 'Wyoming', 'Guam', 'Puerto-Rico', 'American-Samoa', 'U.S.-Virgin-Islands']
console.log(states.slice(30, 34));

let areas = [];
for( let state of states.slice(30, 34)){
    for(let city of geo.getCities('US',state.replace('-',' '))){
        areas.push({state, city});
    }
}

let promises = areas.map(area => async () => {
    let { state, city } = area;
    let urlBase = `https://www.airbnb.com/s/${city.replace(' ','-')}--${state}--United-States/homes`;
    let resultPath = `../states/${state.toLowerCase()}`;

    await scrapeListingsByState(urlBase, resultPath, state, city);
})

sequmise(promises).then().catch();







