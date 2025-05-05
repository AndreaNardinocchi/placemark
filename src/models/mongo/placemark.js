import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  title: String,
  lat: Number,
  long: Number,
  address: String,
  country: String,
  phone: Number,
  website: String,
  visited: String,
  description: String,
  // img: [String],
  img: {
    type: [String], // Array of strings (URLs or image paths)
    default: undefined, // Default is undefined, not an empty array
    required: false, // It's optional
  },
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
