import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userLat: String,
  userLong: String,
  country: String,
  street: String,
  addressCode: String,
  DOB: String,
  phoneNumber: String,
  email: String,
  password: String,
});

export const User = Mongoose.model("User", userSchema);
