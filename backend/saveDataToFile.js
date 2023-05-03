const fs = require('fs');

const main = (filename, data) => {
	fs.writeFileSync(filename, JSON.stringify(data), (err) => {
    if (err) {
      throw `Error writing file: ${err}`;
    } else {
      console.log(`Data saved to '${filename}'`);
    }
  });
}

module.exports = main;