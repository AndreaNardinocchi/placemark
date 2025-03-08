import { v4 } from "uuid";
import { placemarkMemStore } from "./placemark-mem-store.js";

let categories = [];

export const categoryMemStore = {
  async getAllCategories() {
    return categories;
  },

  async addCategory(category) {
    category._id = v4();
    categories.push(category);
    return category;
  },

  // This was updated to ensure the list-placemarks.hbs would work
  async getCategoryById(id) {
    let list = categories.find((category) => category._id === id);
    // Retrieving all placemarks of the category
    // The 'if' condition will fix the bug
    if (list) {
      list.placemarks = await placemarkMemStore.getPlacemarksByCategoryId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  // This method returns categories by userid - assuming each category has this userid field.
  async getUserCategories(userid) {
    return categories.filter((category) => category.userid === userid);
  },

  async deleteCategoryById(id) {
    const index = categories.findIndex((category) => category._id === id);
    if (index !== -1) categories.splice(index, 1);
  },

  async deleteAllCategories() {
    categories = [];
  },

  // eslint-disable-next-line consistent-return
  async updateCategory(updatedCategory) {
    // Finding the category index, which is the same as the update one
    const i = categories.findIndex((category) => category._id === updatedCategory._id);
    // If it does exist then find the category and update
    if (i !== -1) {
      // Update the fields that were passed in the updatedCategory
      const category = categories[i];
      category.title = updatedCategory.title;
      category.img = updatedCategory.img;
    }
  },
};
