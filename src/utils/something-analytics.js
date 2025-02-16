/* This util js file contains methods used for the both dashboard and station views */
import { categoryAnalytics } from "./category-analytics.js";
import { dashboardAnalytics } from "./dashboard-analytics.js";
import { db } from "../models/db.js";

export const somethingAnalytics = {
  // This method is used to sort stations in alphabetical order https://www.youtube.com/watch?v=CTHhlx25X-U
  getSortedCategories(categories) {
    const sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title));
    console.log(categories);
    return sortedCategories;
  },

  // TO RETHINK THIS ONE
  /* The method getStationData(station); is basically the same method as the reportStore.updateReport() one and 
  will make the latest station details show on the dashboard view (passing them through to the latter). 
  https://stackoverflow.com/questions/6439915/how-to-set-a-javascript-object-values-dynamically/6439954#6439954 */
  async getCategoryData(category) {
    const placemarks = await db.placemarkStore.getPlacemarkById(category._id);
    // eslint-disable-next-line no-restricted-globals
    if (placemarks) {
      const placemarkSum = categoryAnalytics.countPlacemarks(category);

      const newCategory = {};
      // eslint-disable-next-line dot-notation
      newCategory["placemarkSum"] = placemarkSum;

      console.log(`somethingAnalytics ${placemarkSum}`);
      await db.categoryStore.updateCategory(category, newCategory);
    }
  },

  // const image = categoryAnalytics.getImageCode(category);
  // //  const title = categoryAnalytics.getImageCode(category);

  // console.log(`Updating category data for ${image}`);

  // // Creating a new object 'newCategory' and retrieving values
  // const newCategory = {};
  // // eslint-disable-next-line dot-notation
  // newCategory["image"] = image;
  // // eslint-disable-next-line dot-notation
  // //  newCategory["title"] = title;

  // console.log(`Updating category data for ${image}`);
  // // console.log(`Updating category data for ${category.title}`);
  // /* The below action calls a new method 'weatherStation.updateStationDetails' and passes
  //   both the original stations and the updated ones into the station-store.js model, which then
  //   will enable the dashboard-view to render them */
  // db.categoryStore.updateCategory(category, newCategory);
};
