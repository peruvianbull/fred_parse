const https = require('https');

const main = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(new Error(`Request failed with status code: ${response.statusCode}`));
      }

      let html = '';
      response.on('data', (chunk) => {
        html += chunk;
      });

      response.on('end', () => {
        resolve(html);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = main;