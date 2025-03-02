import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userLat: Number,
  userLong: Number,
  country: String,
  street: String,
  addressCode: String,
  DOB: String,
  phoneNumber: Number,
  email: String,
  password: String,
  createdTimeStamp: String,
});

export const User = Mongoose.model("User", userSchema);
