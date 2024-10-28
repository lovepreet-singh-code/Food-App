const mongoose = require("mongoose");
const colors = require("colors");
require('dotenv').config();

//function mmongodb dfatabase connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Database ${mongoose.connection.host} `.bgWhite);
  } catch (error) {
    console.log("DB Error", error);
  }
};
module.exports = connectDB;

