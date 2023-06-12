const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const SECRET_TOKEN = 'tusharesumejwttokensecret'

const tokenVerify = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const authToken = req.headers.authorization;
      const token = authToken.split(' ')[1];
      const decodeToken = await jwt.verify(token, SECRET_TOKEN);
      const { _id } = decodeToken;
      req.user = await User.findById(_id);
      next();
    } else {
      res.status(400).json({ message: 'INVALID TOKEN' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const tokenSign = async (user) => {
  const { _id, email, username } = user;
  return await jwt.sign({ _id, email, username }, SECRET_TOKEN, {
    expiresIn: '1d'
  });
};


module.exports = {
  tokenVerify,
  tokenSign
};
