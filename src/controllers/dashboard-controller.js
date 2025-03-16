/* Model–view–controller (MVC) is a software design pattern commonly used for developing 
user interfaces that divide the related program logic into three interconnected elements. */
import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";
import { categoryAnalytics } from "../utils/category-analytics.js";
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
      // 'if' condition to determine image and 'notes to show according to the 'title' selected
      let image = "";
      let notes = "";
      // eslint-disable-next-line prefer-destructuring
      let title = request.payload.title;
      if (title === "Restaurants") {
        image = "https://i.ibb.co/gZjF0ppp/jerk-pasta-recipe.png";
        notes = "All restaurants you would like to dine or you already had the pleasure to be in can be added and listed here. Just a handy note for your next trip.";
      } else if (title === "Museums") {
        image = "https://i.ibb.co/HD39FR6p/man-2590655-big.jpg";
        notes = "This is the category in which all worldwide famous museums or art galleries you wish to visit or you lready visited can be added to.";
      } else if (title === "Beaches") {
        image = "https://i.ibb.co/LhrJWjcb/coast-7366616.jpg";
        notes = "There are surely so many beaches you would like to sunbath in and relish the sweet marine breeze caressing your skin. Why not list them all here?";
      } else {
        image = "https://i.ibb.co/pjbvydw1/parks.jpg";
        notes = "Sometimes, there is no better thing to do than slipping in your running shoes for a jog in the park. Which park are gonna go next though?";
      }
      const newCategory = {
        userid: loggedInUser._id,
        title: title,
        notes: notes,
        image: image,
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
