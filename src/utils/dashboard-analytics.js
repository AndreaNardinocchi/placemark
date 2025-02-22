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

  getTravelIcon(category) {
    // const icon = [];
    let destination = "";
    let travelIcon = "";
    if (category.placemarks) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          // yesNoIcon = visit.concat("fas fa-solid fa-flag");
          travelIcon = "fas fa-solid fa-car";
          // icon.length = [];
          // icon.push(yesNoIcon);
        } else if (destination === "France") {
          travelIcon = "fas fa-solid fa-plane";
          // icon.length = [];
          // icon.push(yesNoIcon);
        } else {
          travelIcon = null;
        }
      }
    }
    console.log(`This is ${travelIcon} on yesNoIcon `);
    return travelIcon;
  },
};
