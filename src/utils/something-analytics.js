/* This util js file contains methods used for the both dashboard and station views */
import { categoryAnalytics } from "./category-analytics.js";
// eslint-disable-next-line import/no-cycle
import { db } from "../models/db.js";
import { dashboardAnalytics } from "./dashboard-analytics.js";

export const somethingAnalytics = {
  // This method is used to sort stations in alphabetical order https://www.youtube.com/watch?v=CTHhlx25X-U
  getSortedCategories(categories) {
    const sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title));
    console.log(categories);
    return sortedCategories;
  },

  getAccountCategories0(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);

    // console.log(titles);

    // Access each title individually
    let lamb = "";
    // eslint-disable-next-line prefer-const
    let lambs = [];
    // eslint-disable-next-line prefer-const
    let lambsId = [];
    let lambId = "";
    lambs.slice();

    categories.forEach((category) => {
      lamb = category.title;
      lambId = category._id;
      lambs.push(lamb);
      lambsId.push(lambId);
      // console.log(lamb);
    });

    // eslint-disable-next-line prefer-const
    let lamb0 = lambs[0];
    // eslint-disable-next-line prefer-const
    let lambId0 = lambsId[0];
    console.log(` The lamb0 ${lambs}`);

    return lamb0;
  },

  getAccountCategoriesId0(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);

    // console.log(titles);

    // Access each title individually
    let lamb = "";
    // eslint-disable-next-line prefer-const
    let lambs = [];
    // eslint-disable-next-line prefer-const
    let lambsId = [];
    let lambId = "";
    lambs.slice();

    categories.forEach((category) => {
      lamb = category.title;
      lambId = category._id;
      lambs.push(lamb);
      lambsId.push(lambId);
      // console.log(lamb);
    });

    // eslint-disable-next-line prefer-const
    let lamb0 = lambs[0];
    // eslint-disable-next-line prefer-const
    let lambId0 = lambsId[0];
    console.log(` The lambId0 ${lambId0}`);

    return lambId0;
  },

  getAccountCategories1(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);

    // console.log(titles);

    // Access each title individually
    let lamb = "";
    let lambId = "";
    // eslint-disable-next-line prefer-const
    let lambs = [];
    lambs.slice();

    categories.forEach((category) => {
      lamb = category.title;
      lambId = category._id;
      lambs.push(lamb);
      console.log(lamb);
      console.log(`ID: ${lambId}`);
    });
    console.log(lambs);

    // eslint-disable-next-line prefer-const
    let lamb1 = lambs[1];

    console.log(lamb1);

    return lamb1;
  },

  getAccountCategoriesId1(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);

    // console.log(titles);

    // Access each title individually
    let lamb = "";
    // eslint-disable-next-line prefer-const
    let lambs = [];
    // eslint-disable-next-line prefer-const
    let lambsId = [];
    let lambId = "";
    lambs.slice();

    categories.forEach((category) => {
      lamb = category.title;
      lambId = category._id;
      lambs.push(lamb);
      lambsId.push(lambId);
      // console.log(lamb);
    });

    // eslint-disable-next-line prefer-const
    let lamb0 = lambs[0];
    // eslint-disable-next-line prefer-const
    let lambId1 = lambsId[1];

    return lambId1;
  },

  getAccountCategories2(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);

    // console.log(titles);

    // Access each title individually
    let lamb = "";
    // eslint-disable-next-line prefer-const
    let lambs = [];
    // eslint-disable-next-line prefer-const
    let lambsId = [];
    let lambId = "";
    lambs.slice();

    categories.forEach((category) => {
      lamb = category.title;
      lambId = category._id;
      lambs.push(lamb);
      lambsId.push(lambId);
      // console.log(lamb);
    });

    // eslint-disable-next-line prefer-const
    let lamb2 = lambs[2];
    // eslint-disable-next-line prefer-const
    let lambId0 = lambsId[0];
    // console.log(` The lambId0 ${lambId0}`);

    return lamb2;
  },

  getAccountCategoriesId2(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);

    // console.log(titles);

    // Access each title individually
    let lamb = "";
    // eslint-disable-next-line prefer-const
    let lambs = [];
    // eslint-disable-next-line prefer-const
    let lambsId = [];
    let lambId = "";
    lambs.slice();

    categories.forEach((category) => {
      lamb = category.title;
      lambId = category._id;
      lambs.push(lamb);
      lambsId.push(lambId);
      // console.log(lamb);
    });

    // eslint-disable-next-line prefer-const
    let lamb0 = lambs[0];
    // eslint-disable-next-line prefer-const
    let lambId2 = lambsId[2];
    // console.log(` The lambId0 ${lambId0}`);

    return lambId2;
  },

  getAccountCategories3(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);

    // console.log(titles);

    // Access each title individually
    let lamb = "";
    let lambId = "";
    // eslint-disable-next-line prefer-const
    let lambs = [];
    lambs.slice();

    categories.forEach((category) => {
      lamb = category.title;
      lambId = category._id;
      lambs.push(lamb);
      console.log(lamb);
      console.log(`ID: ${lambId}`);
    });
    console.log(lambs);

    // eslint-disable-next-line prefer-const
    let lamb3 = lambs[3];

    // console.log(lamb1);

    return lamb3;
  },

  getAccountCategoriesId3(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);

    // console.log(titles);

    // Access each title individually
    let lamb = "";
    // eslint-disable-next-line prefer-const
    let lambs = [];
    // eslint-disable-next-line prefer-const
    let lambsId = [];
    let lambId = "";
    lambs.slice();

    categories.forEach((category) => {
      if (category) lamb = category.title;
      lambId = category._id;
      lambs.push(lamb);
      lambsId.push(lambId);
      // console.log(lamb);
    });

    // eslint-disable-next-line prefer-const
    let lamb0 = lambs[0];
    // eslint-disable-next-line prefer-const
    let lambId3 = lambsId[3];

    return lambId3;
  },

  // TO RETHINK THIS ONE
  /* The method getStationData(station); is basically the same method as the reportStore.updateReport() one and 
  will make the latest station details show on the dashboard view (passing them through to the latter). 
  https://stackoverflow.com/questions/6439915/how-to-set-a-javascript-object-values-dynamically/6439954#6439954 */
  async getCategoryData(category) {
    // const placemarks = await db.placemarkStore.getPlacemarkById(category._id);
    // eslint-disable-next-line no-restricted-globals
    if (category.placemarks) {
      // const placemarkSum = categoryAnalytics.countPlacemarks(category);
      const country = dashboardAnalytics.getTravelIcon(category);

      const newCategory = {};

      // newCategory["placemarkSum"] = placemarkSum;
      // eslint-disable-next-line dot-notation
      newCategory["country"] = country;

      // console.log(`somethingAnalytics ${placemarkSum}`);
      await db.categoryStore.updateCategory(category, newCategory);
    }
  },
};
