const main = (json) => {
	const keyValuePairs = Object.entries(json).map(([key, value]) => {
		return encodeURIComponent(key) + '=' + encodeURIComponent(value);
	});
	return keyValuePairs.join('&');
}

module.exports = main;