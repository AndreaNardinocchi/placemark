import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    try {
      placemark.categoryid = categoryId;
      const newplacemark = new Placemark(placemark);
      const placemarkObj = await newplacemark.save();
      return this.getPlacemarkById(placemarkObj._id);
    } catch (error) {
      console.error("Error adding placemark:", error);
      throw error;
    }
  },

  async getPlacemarksByCategoryId(id) {
    const placemarks = await Placemark.find({ categoryid: id }).lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    const placemarkDoc = await Placemark.findOne({ _id: placemark._id });
    console.log(placemarkDoc);
    placemarkDoc.title = updatedPlacemark.title;
    placemarkDoc.long = updatedPlacemark.long;
    placemarkDoc.lat = updatedPlacemark.lat;
    placemarkDoc.address = updatedPlacemark.address;
    placemarkDoc.country = updatedPlacemark.country;
    placemarkDoc.phone = updatedPlacemark.phone;
    placemarkDoc.website = updatedPlacemark.website;
    placemarkDoc.visited = updatedPlacemark.visited;
    placemarkDoc.description = updatedPlacemark.description;
    await placemarkDoc.save();
  },

  //   await Placemark.findOne(placemark);
  //   try {
  //     const updatePlacemark = await Placemark.updateOne(placemark, updatedPlacemark);
  //     console.log(updatePlacemark);
  //     console.log(`${updatePlacemark.matchedCount} document(s) matched the filter, updated ${updatePlacemark.modifiedCount} document(s)`);
  //   } catch (error) {
  //     console.error("Error updating record:", error);
  //   }
  // },
};
