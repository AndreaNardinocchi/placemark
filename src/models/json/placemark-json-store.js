import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    await db.read();
    placemark._id = v4();
    placemark.categoryid = categoryId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    await db.read();
    let foundPlacemark = db.data.placemarks.filter((placemark) => placemark.categoryid === id);
    if (!foundPlacemark) {
      foundPlacemark = null;
    }
    return foundPlacemark;
  },

  async getPlacemarkById(id) {
    await db.read();
    let foundPlacemark = db.data.placemarks.find((placemark) => placemark._id === id);
    if (!foundPlacemark) {
      foundPlacemark = null;
    }
    return foundPlacemark;
  },

  async deletePlacemark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.title = updatedPlacemark.title;
    placemark.artist = updatedPlacemark.artist;
    placemark.duration = updatedPlacemark.duration;
    await db.write();
  },
};
