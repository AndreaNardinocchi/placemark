import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trackSchema = new Schema({
  title: String,
  long: String,
  lat: String,
  country: String,
  address: String,
  phone: Number,
  website: String,
  description: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Track = Mongoose.model("Track", trackSchema);
