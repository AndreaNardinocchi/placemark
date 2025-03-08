import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placemarkJsonStore } from "./placemark-json-store.js";

export const categoryJsonStore = {
  async getAllCategories() {
    await db.read();
    return db.data.categories;
  },

  async addCategory(category) {
    await db.read();
    category._id = v4();
    db.data.categories.push(category);
    await db.write();
    return category;
  },

  async getCategoryById(id) {
    await db.read();
    let list = db.data.categories.find((category) => category._id === id);
    // The 'if' condition will fix the bug
    if (list) {
      list.placemarks = await placemarkJsonStore.getPlacemarksByCategoryId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCategories(userid) {
    await db.read();
    return db.data.categories.filter((category) => category.userid === userid);
  },

  async deleteCategoryById(id) {
    await db.read();
    const index = db.data.categories.findIndex((category) => category._id === id);
    if (index !== -1) db.data.categories.splice(index, 1);
    await db.write();
  },

  async deleteAllCategories() {
    db.data.categories = [];
    await db.write();
  },

  // eslint-disable-next-line consistent-return
  async updateCategory(updatedCategory) {
    await db.read();
    // Finding the category index, which is the same as the update one
    const i = db.data.categories.findIndex((category) => category._id === updatedCategory._id);
    // If it does exist then find the category and update
    if (i !== -1) {
      // Update the fields that were passed in the updatedCategory
      const category = db.data.categories[i];
      category.title = updatedCategory.title;
      category.img = updatedCategory.img;
      await db.write();
      return category;
    }
  },
};
