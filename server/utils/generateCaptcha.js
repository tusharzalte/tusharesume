const randomstring = require("randomstring");

module.exports = () => {
    return randomstring.generate({
        length: 6,
        charset: "alphanumeric",
    });
};

