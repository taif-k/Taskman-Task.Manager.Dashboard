/*
Purpose: Define how user data is stored in the database.(defines the structure of user documents stored in MongoDB.)
This file contains a Mongoose schema and model.
*/

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    unique: true
  },
  password: String
});

module.exports = mongoose.model("User", UserSchema);


/* example of json struc
{
 "fullName": "Taif",
 "email": "taif@email.com",
 "password": "123456"
}
*/ 