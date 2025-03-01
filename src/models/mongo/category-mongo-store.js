// import { somethingAnalytics } from "../../utils/something-analytics.js";
import { Category } from "./category.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.placemarks = await placemarkMongoStore.getPlacemarksByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category) {
    // Check if the category already exists in the database
    const existingCategory = await Category.findOne(category);

    if (existingCategory) {
      // If a category already exists, return an error or a message
      // throw new Error("Category already exists");
      // eslint-disable-next-line no-alert

      category = null;
      return category;
    }

    // If no duplicate, create a new category
    const newCategory = new Category(category);

    // Save the new category to the database
    const categoryObj = await newCategory.save();

    // Return the saved category
    return this.getCategoryById(categoryObj._id);
  },

  // async addCategory(category) {
  //   const newCategory = new Category(category);
  //   const categoryObj = await newCategory.save();
  //   return this.getCategoryById(categoryObj._id);
  // },

  async getUserCategories(id) {
    const category = await Category.find({ userid: id }).lean();
    // eslint-disable-next-line no-self-assign
    // const image = await somethingAnalytics.getCategoryData(category);
    // // eslint-disable-next-line no-self-assign
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
    // const placemarkSum = somethingAnalytics.getCategoryData(category);
    // eslint-disable-next-line no-self-assign
    // category.title = category.title;
    // console.log(`Mongo title ${category.title}`);
    // eslint-disable-next-line no-self-assign
    // category.image = newCategory.image;
    // category.placemarkSum = newCategory.placemarkSum;

    // console.log(`Mongo image ${category.image}`);

    await Category.updateOne();
  },
};
