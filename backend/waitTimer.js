const main = (secondsToWait) => {
	return new Promise(resolve => setTimeout(resolve, secondsToWait * 1000));
}

module.exports = main;