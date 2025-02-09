/* Model–view–controller (MVC) is a software design pattern commonly used for developing 
user interfaces that divide the related program logic into three interconnected elements. */

import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";
import { dashboardAnalytics } from "../utils/dashboard-analytics.js";
import { categoryController } from "./category-controller.js";
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
      // console.log(request.auth.credentials);
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      // The 'sortedStations' object invokes a method contained in the 'weatherstationAnalytics' utility to sort the stations in alhabetical order
      const sortedCategories = somethingAnalytics.getSortedCategories(categories);

      const viewData = {
        title: "Category Dashboard",
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
      const newCategory = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
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
