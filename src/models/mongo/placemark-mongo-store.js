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
    if (placemarkDoc) {
      placemarkDoc.title = updatedPlacemark.title;
      placemarkDoc.lat = updatedPlacemark.lat;
      placemarkDoc.long = updatedPlacemark.long;
      placemarkDoc.address = updatedPlacemark.address;
      placemarkDoc.country = updatedPlacemark.country;
      placemarkDoc.phone = updatedPlacemark.phone;
      placemarkDoc.website = updatedPlacemark.website;
      placemarkDoc.visited = updatedPlacemark.visited;
      placemarkDoc.description = updatedPlacemark.description;
      // placemarkDoc.img = updatedPlacemark.img;
      await placemarkDoc.save();
      // Or throw an error depending on your needs
    } else {
      placemarkNotFound = "Placemark not found";
      console.log(`Updating placemark ${placemarkDoc}`);
    }
    return placemarkDoc;
  },

  async updatePlacemarkImage(updatedPlacemark) {
    const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
    console.log(placemark);
    if (placemark) {
      placemark.title = updatedPlacemark.title;
      placemark.img = updatedPlacemark.img;
      await placemark.save();
      // Or throw an error depending on your needs
    } else {
      placemarkNotFound = "Placemark not found";
      console.log(`Updating placemark ${placemark}`);
    }
    return placemark;
  },
};
