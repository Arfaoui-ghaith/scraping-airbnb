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
const urlBaseIllinois = "https://www.airbnb.com/s/Illinois--United-States/homes"
const resultPathIllinois = './states/illinois';
const urlBaseIndiana = "https://www.airbnb.com/s/Indiana--United-States/homes"
const resultPathIndiana = './states/indiana';
const urlBaseIowa = "https://www.airbnb.com/s/Iowa--United-States/homes"
const resultPathIowa = './states/iowa';
const urlBaseKansas = "https://www.airbnb.com/s/Kansas--United-States/homes"
const resultPathKansas = './states/kansas';
const urlBaseKentucky = "https://www.airbnb.com/s/Kentucky--United-States/homes"
const resultPathKentucky = '../states/kentucky';
const urlBaseLouisiana = "https://www.airbnb.com/s/Louisiana--United-States/homes";
const resultPathLouisiana = '../states/louisiana';
const urlBaseMaine = "https://www.airbnb.com/s/Maine--United-States/homes"
const resultPathMaine = "../states/maine";
const urlBaseMaryland = "https://www.airbnb.com/s/Maryland--United-States/homes";
const resultPathMaryland = "../states/maryland";
const urlBaseMassachusetts	 = "https://www.airbnb.com/s/Massachusetts--United-States/homes";
const resultPathMassachusetts	 = "../states/massachusetts";
const urlBaseMichigan	 = "https://www.airbnb.com/s/Michigan--United-States/homes";
const resultPathMichigan	 = "../states/michigan";


scrapeListingsByState(urlBaseKentucky,resultPathKentucky, 'Kentucky').then(
    () => scrapeListingsByState(urlBaseLouisiana,resultPathLouisiana, 'Louisiana').then(
        () => scrapeListingsByState(urlBaseMaine,resultPathMaine, 'Maine').then(
            () => scrapeListingsByState(urlBaseMaryland,resultPathMaryland, 'Maryland').then(
                () => scrapeListingsByState(urlBaseMassachusetts,resultPathMassachusetts, 'Massachusetts').then(
                    () => scrapeListingsByState(urlBaseMichigan,resultPathMichigan, 'Michigan').then(
                        () => scrapeListingsByState(urlBaseIdaho,resultPathIdaho, 'Idaho').then(
                            () => scrapeListingsByState(urlBaseIllinois,resultPathIllinois, 'Illinois').then(
                                () => scrapeListingsByState(urlBaseIndiana,resultPathIndiana, 'Indiana').then(
                                    () => scrapeListingsByState(urlBaseIowa,resultPathIowa, 'Iowa').then(
                                        () => scrapeListingsByState(urlBaseKansas,resultPathKansas, 'Kansas').then(
                                        ).catch()
                                    ).catch()
                                ).catch()
                            ).catch()
                        ).catch()
                    ).catch()
                ).catch()
            ).catch()
        ).catch()
    ).catch()
).catch()


