import { db } from "../models/db.js";

/* This util js file contains all methods used for the dashboard view */
export const categoryAnalytics = {
  getImageCode(category) {
    if (category) {
      let imageCode = null;
      for (let i = 0; i < 1; i += 1) {
        if (category.title === "Restaurants") {
          imageCode = "https://i.ibb.co/qL14ZG2g/mossel-dish-7724006-1280.jpg";
        } else if (category.title === "Museums") {
          imageCode = "https://i.ibb.co/C5hpYTW3/man-2590655-1280.jpg";
        } else if (category.title === "Beaches") {
          imageCode = "https://i.ibb.co/1YHM8FHt/coast-7366616-1280.jpg";
        } else if (category.title === "Parks") {
          imageCode = "https://i.ibb.co/jPnk3WxG/autumn-3731094-1280.jpg";
        }
      }
      return imageCode;
    }
    return null;
  },

  getBackgroundColor(category) {
    if (category) {
      let backgroundColor = "";
      for (let i = 0; i < 1; i += 1) {
        if (category.title === "Restaurants") {
          backgroundColor = "title box has-text-centered has-background-grey-dark has-text-white";
        } else if (category.title === "Museums") {
          backgroundColor = "title box has-text-centered has-background-black-bis has-text-white";
        } else if (category.title === "Beaches") {
          backgroundColor = "title box has-text-centered has-background-grey-light has-text-white";
        } else if (category.title === "Parks") {
          backgroundColor = "title box has-text-centered has-background-grey-darker has-text-white";
        }
      }
      return backgroundColor;
    }
    return null;
  },

  // eslint-disable-next-line consistent-return
  async countPlacemarks(category) {
    if (category) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      let placemarkSum = 0;
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        placemarkSum += i;
      }
      console.log(`This is ${placemarkSum}`);
      return placemarkSum;
    }
  },

  getYesNoIcon(placemark) {
    let yesNoIcon = "";
    // eslint-disable-next-line no-restricted-globals
    if (placemark) {
      for (let i = 0; i < 1; i += 1) {
        // eslint-disable-next-line eqeqeq
        if (placemark.visited == "Yes") {
          yesNoIcon = "fas fa-solid fa-check";
          // eslint-disable-next-line eqeqeq
        } else {
          yesNoIcon = "fas fa-solid fa-exclamation";
        }
      }
    }
    console.log(`This is ${yesNoIcon}`);
    return yesNoIcon;
  },
};
