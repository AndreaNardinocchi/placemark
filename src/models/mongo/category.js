import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  title: String,
  userLat: Number,
  userLong: Number,
  notes: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  placemarks: {
    type: Schema.Types.Array,
    ref: "Placemark",
  },
});

export const Category = Mongoose.model("Category", categorySchema);
