const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config({ path: "./config.env" });

const URL = 'mongodb+srv://Tushar:AIMpEPMH9lIrE79a@cluster0.turjukc.mongodb.net/tusharresume'

mongoose.connect(URL , {useUnifiedTopology:true , useNewUrlParser:true})

const connection = mongoose.connection

connection.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

connection.on("error", (error) => {
  console.log(error);
});