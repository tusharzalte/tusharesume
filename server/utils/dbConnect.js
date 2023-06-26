const mongoose = require("mongoose");
require('dotenv').config()
const URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('connected to mongodb');

  } catch (error) {
    console.error('error connecting to mongodb', error)
  }
};

module.exports = connectDB;