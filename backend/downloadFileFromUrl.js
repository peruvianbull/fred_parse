const https = require('https');
const fs = require('fs');

function downloadFile(url, destination, retries = 3) {
  return new Promise((resolve, reject) => {
    const attemptDownload = (attemptsLeft) => {
      const file = fs.createWriteStream(destination);
      https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (error) => {
        fs.unlink(destination, () => {});
        if (attemptsLeft > 0) {
          console.log(`Retrying download... Attempts left: ${attemptsLeft}`);
          attemptDownload(attemptsLeft - 1);
        } else {
          reject(error);
        }
      });
    };

    attemptDownload(retries);
  });
}

const main = async (url, destination) => {
  try {
    await downloadFile(url, destination);
    console.log(`File downloaded successfully [${destination}]`);
  } catch (error) {
    console.error(`Error downloading file [${destination}]:`, error);
  }
};

module.exports = main;
