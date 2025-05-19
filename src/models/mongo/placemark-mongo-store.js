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
    return placemarks.map((p) => ({
      ...p,
      img: Array.isArray(p.img) ? p.img : [],
    }));
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      if (placemark) {
        placemark.img = Array.isArray(placemark.img) ? placemark.img : [];
      }
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

  // async updatePlacemark(placemark) {
  //   const placemarkDoc = await Placemark.findOne({ _id: placemark._id });
  //   placemarkDoc.title = placemark.title;
  //   placemarkDoc.lat = placemark.lat;
  //   placemarkDoc.long = placemark.long;
  //   placemarkDoc.address = placemark.address;
  //   placemarkDoc.country = placemark.country;
  //   placemarkDoc.phone = placemark.phone;
  //   placemarkDoc.website = placemark.website;
  //   placemarkDoc.visited = placemark.visited;
  //   placemarkDoc.description = placemark.description;
  //   placemarkDoc.img = placemark.img;
  //   await placemarkDoc.save();
  //   return placemarkDoc;
  // },

  async updatePlacemark(placemark, updatedPlacemark) {
    const placemarkDoc = await Placemark.findOne({ _id: placemark._id });
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
      placemarkDoc.img = placemark.img;
      await placemarkDoc.save();
      // Or throw an error depending on your needs
    } else {
      placemarkNotFound = "Placemark not found";
    }
    return placemarkDoc;
  },
};
