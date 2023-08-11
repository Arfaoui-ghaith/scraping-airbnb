const { scrapeListingsByState } = require('./scrapeListingsByState');


const urlBaseAlaska = "https://www.airbnb.com/s/Alaska--United-States/homes"
const resultPathAlaska = '../states/alaska';
const urlBaseAlabama = "https://www.airbnb.com/s/Alabama--United-States/homes";
const resultPathAlabama = '../states/alabama';
const urlBaseArizona = "https://www.airbnb.com/s/Arizona--United-States/homes"
const resultPathArizona = "../states/arizona";
const urlBaseArkansas = "https://www.airbnb.com/s/Arkansas--United-States/homes";
const resultPathArkansas = "../states/arkansas";
const urlBaseCalifornia = "https://www.airbnb.com/s/California--United-States/homes";
const resultPathCalifornia = "../states/california";
const urlBaseColorado = "https://www.airbnb.com/s/Colorado--United-States/homes";
const resultPathColorado = "../states/colorado";
const urlBaseConnecticut = "https://www.airbnb.com/s/Connecticut--United-States/homes";
const resultPathConnecticut = "../states/connecticut";
const urlBaseDelaware = "https://www.airbnb.com/s/Delaware--United-States/homes";
const resultPathDelaware = "../states/delaware";
const urlBaseFlorida = "https://www.airbnb.com/s/Florida--United-States/homes";
const resultPathFlorida = "../states/florida";
const urlBaseGeorgia = "https://www.airbnb.com/s/Georgia--United-States/homes";
const resultPathGeorgia = "../states/georgia";
const urlBaseHawaii = "https://www.airbnb.com/s/Hawaii--United-States/homes";
const resultPathHawaii = "../states/hawaii";
const urlBaseIdaho = "https://www.airbnb.com/s/Idaho--United-States/homes";
const resultPathIdaho = "../states/idaho";


scrapeListingsByState(urlBaseIdaho,resultPathIdaho, 'Idaho').then().catch()


