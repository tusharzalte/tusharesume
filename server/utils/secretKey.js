const randomstring = require("randomstring");

module.exports = randomstring.generate({
    length: 32, // You can adjust the length of the secret key as needed
    charset: "alphanumeric",
  });