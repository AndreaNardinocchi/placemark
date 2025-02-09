import { v4 } from "uuid";
import { trackMemStore } from "./track-mem-store.js";

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

  // This was updated to ensure the list-tracks.hbs would work
  async getCategoryById(id) {
    let list = categories.find((category) => category._id === id);
    // Retrieving all tracks of the category
    // The 'if' condition will fix the bug
    if (list) {
      list.tracks = await trackMemStore.getTracksByCategoryId(list._id);
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
};
