const fs = require('fs');

const main = (csvfile) => {
	if (!csvfile){ return null; }
	let csvData = fs.readFileSync(`./${csvfile}`, 'utf8');

	const lines = csvData.split('\n');
	const headers = lines[0].split(',');

	const result = [];
	for (let i = 1; i < lines.length; i++) {
		const data = lines[i].split(',');
		if (data.length === headers.length) {
			const obj = {};
			for (let j = 0; j < headers.length; j++) {
				if (data[j] === '.') {
					obj[headers[j]] = null;
				} else {
					obj[headers[j]] = isNaN(Number(data[j])) ? data[j] : Number(data[j]);
				}
			}
			result.push(obj);
		}
	}

	return result;
}

module.exports = main;