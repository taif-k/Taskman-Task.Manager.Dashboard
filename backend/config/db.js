const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;


/* order to check for debugging when working with render , netlify and mongodb
Backend URL in browser
Backend API in Postman
Frontend calling backend
*/ 