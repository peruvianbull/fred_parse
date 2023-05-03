const fetchHTML = require('./fetchHTML');
const csvToJson = require('./csvToJson');
const mergeArrays = require('./mergeArrays');
const sortByDate = require('./sortByDate');
const saveDataToFile = require('./saveDataToFile');


const rrpAwardsSource = `https://fred.stlouisfed.org/series/RRPONTSYAWARD`;
const rrpAgreementSource = `https://fred.stlouisfed.org/series/RRPONTSYD`;
const rrpAwardsCsv = `RRPONTSYAWARD.csv`;
const rrpAgreementCsv = `RRPONTSYD.csv`;
const dataFilename = `RRP.json`


const main = async()=>{
	//get the 2 pages (cron job)
	//let [rrpAwardHtml, rrpAgreementHtml] = await Promise.all(fetchHTML(rrpAwardsPage), fetchHTML(rrpAgreementPage));
	
	//download the relative csv files

	//convert, merge, and sort the csv files
	let rrpAwardsJson = csvToJson(rrpAwardsCsv);
	let rrpAgreementJson = csvToJson(rrpAgreementCsv);
	let mergedData = mergeArrays(rrpAwardsJson, rrpAgreementJson);
	let sortedData = sortByDate(mergedData);
	
	//save the data locally for web upload
	await saveDataToFile(dataFilename, sortedData);
};
main();