/* Model–view–controller (MVC) is a software design pattern commonly used for developing 
user interfaces that divide the related program logic into three interconnected elements. */
import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";
import { somethingAnalytics } from "../utils/something-analytics.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      /**
       * When adding a category we include the users ID,
       * we recover the user from the session, and use
       * the user ID as the userid property of the new category
       * const loggedInUser = request.auth.credentials;
       * */
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      // The 'sortedStations' object invokes a method contained in the 'somethingAnalytics' utility to sort the stations in alhabetical order
      const sortedCategories = somethingAnalytics.getSortedCategories(categories);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        categories: sortedCategories,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCategory: {
    validate: {
      payload: CategorySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Category error", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      // eslint-disable-next-line prefer-destructuring
      let title = request.payload.title;
      const newCategory = {
        userid: loggedInUser._id,
        title: title,
        userLat: Number(request.payload.userLat),
        userLong: Number(request.payload.userLong),
        notes: request.payload.notes,
      };
      /** Checking on whether the category title already exists. This app will only allow the user to add
       * 4 categories in its 'basic' version.
       */
      let exTitle = "";
      // eslint-disable-next-line prefer-const
      let existingTitle = [];
      categories.forEach((category) => {
        exTitle = category.title;
        console.log("Existing title", exTitle);
        existingTitle.push(exTitle);
      });
      let existingTitleNow = "";
      for (let i = 0; i < existingTitle.length; i += 1) {
        existingTitleNow = existingTitle[i];
        if (existingTitle[i] === title) {
          title = null;
          return h.redirect("/dashboard");
        }
      }
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      // We are retrieving/extracting the category
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.categoryStore.deleteCategoryById(category._id);
      return h.redirect("/dashboard");
    },
  },
};
