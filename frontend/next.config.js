const fs = require("fs");
const path = require("path");

module.exports = {
  server: {
    https: {
      key: fs.readFileSync(path.join(__dirname, "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
    },
  },
};
