const https = require('https');
const fs = require('fs');

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (error) => {
      fs.unlink(destination, () => {});
      reject(error);
    });
  });
}

const main = async (url, destination) => {
	await downloadFile(url, destination)
  .then(() => console.log(`File downloaded successfully [${destination}]`))
  .catch((error) => console.error(`Error downloading file [${destination}]:`, error));
}

module.exports = main;