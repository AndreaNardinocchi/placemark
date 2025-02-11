// import { somethingAnalytics } from "../../utils/something-analytics.js";
import { Category } from "./category.js";
import { trackMongoStore } from "./track-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.tracks = await trackMongoStore.getTracksByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getUserCategories(id) {
    const category = await Category.find({ userid: id }).lean();
    // eslint-disable-next-line no-self-assign
    // const image = await somethingAnalytics.getCategoryData(category);
    // eslint-disable-next-line no-self-assign
    // category.image = category.image;
    // console.log(`Get Mongo ${image}`);
    return category;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  },

  async updateCategory(category, newCategory) {
    await Category.findOne({ _id: category._id });
    // eslint-disable-next-line no-self-assign
    category.title = category.title;
    console.log(`Mongo ${category.title}`);
    // eslint-disable-next-line no-self-assign

    category.image = newCategory.image;

    console.log(`Mongo ${category.image}`);

    await Category.updateOne();
  },
};
