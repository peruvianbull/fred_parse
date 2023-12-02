const dlRRAAwardsRate = require('./dlRRAAwardsRate');
const dlRRP = require('./dlRRP');
const waitTimer = require('./waitTimer');
const csvToJson = require('./csvToJson');
const mergeArrays = require('./mergeArrays');
const sortByDate = require('./sortByDate');
const saveDataToFile = require('./saveDataToFile');


// const rrpAwardsSource = `https://fred.stlouisfed.org/series/RRPONTSYAWARD`;
// const rrpAgreementSource = `https://fred.stlouisfed.org/series/RRPONTSYD`;
const rrpAwardsCsv = `./backend/RRPONTSYAWARD.csv`;
const rrpAgreementCsv = `./backend/RRPONTSYD.csv`;
const dataFilename = `./frontend/RRP.json`


const main = async()=>{
	//download the relative csv files (cron job)
	await Promise.all([dlRRAAwardsRate(rrpAwardsCsv), dlRRP(rrpAgreementCsv)]);
	
	//wait a second for the files to be avaialble to io
	waitTimer(2); 

	//convert, merge, and sort the csv files
	let rrpAwardsJson = csvToJson(rrpAwardsCsv);
	let rrpAgreementJson = csvToJson(rrpAgreementCsv);
	let mergedData = mergeArrays(rrpAwardsJson, rrpAgreementJson);
	let sortedData = sortByDate(mergedData);
	
	//save the data locally for web upload
	await saveDataToFile(dataFilename, sortedData);

	console.log(`JSON data file saved to [${dataFilename}]`);
};
main();