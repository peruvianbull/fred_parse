const main = (arr) => {
	return arr.sort((a, b) => new Date(a.DATE) - new Date(b.DATE));
}

module.exports = main;