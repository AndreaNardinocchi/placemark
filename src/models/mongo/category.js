import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  title: String,
  userLat: String,
  userLong: String,
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

// placemark: {
//   type: Schema.Types.Array,
//   ref: "Placemark",
// },
