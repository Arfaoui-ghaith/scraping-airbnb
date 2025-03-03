const { scrapeListingsByState } = require('./scrapeListingsByState');
const sequmise = require('sequmise')

const urlBaseNorthCarolina	 = "https://www.airbnb.com/s/North-Carolina--United-States/homes"
const resultPathNorthCarolina	 = '../states/north carolina';

const states = ['Alaska', 'Alabama', 'Arizona', 'Arkansas', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
    'Nevada', 'New-Hampshire', 'New-Jersey', 'New-Mexico', 'New-York', 'North-Carolina', 'North-Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode-Island', 'South-Carolina', 'South-Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West-Virginia', 'Wisconsin', 'Wyoming', 'Guam', 'Puerto-Rico', 'American-Samoa', 'U.S.-Virgin-Islands']
console.log(states.slice(40, 45))
let promises = states.slice(40, 45).map(state => async () => {
    let urlBase = `https://www.airbnb.com/s/${state}--United-States/homes`;
    let resultPath = `../states/${state.replace(' ', '-').toLowerCase()}`;

    await scrapeListingsByState(urlBase, resultPath, state);
})

sequmise(promises).then().catch();







