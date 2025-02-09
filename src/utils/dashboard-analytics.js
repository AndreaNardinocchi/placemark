/* This util js file contains all methods used for the dashboard view */
import { categoryAnalytics } from "./category-analytics.js";

export const dashboardAnalytics = {
  getImageCode(category) {
    let imageCode = categoryAnalytics.getImageCode(category);
    // if (category) {
    //   // Icons changing based upon the weather code

    //   // To ensure that the report shown is the most up-to-date https://www.freecodecamp.org/news/how-to-get-the-last-item-in-an-array-in-javascript/
    //   imageCode = category[category.length - 1];
    //   for (let i = 0; i < 1; i += 1) {
    if (category.title === "Restaurants") {
      imageCode = "https://i.ibb.co/WWm5gtyd/mossel-dish-7724006-1280.jpg";
    } else {
      imageCode = null;
      // }
    }
    console.log(`${imageCode} + dashboardanalytics`);
    return imageCode;
    // }
    //  return null;
  },
};
