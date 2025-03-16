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
  countPlacemarks(category) {
    if (category.placemarks) {
      let placemarkSum = 0;
      for (let i = 0; i < category.placemarks.length; i += 1) {
        placemarkSum += 1;
      }
      return placemarkSum;
    }
  },

  // eslint-disable-next-line consistent-return
  getYesCounting(category) {
    if (category.placemarks) {
      const yes = [];
      const no = [];
      let visit = "";
      let yesNoIcon = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        visit = category.placemarks[i].visited;
        if (visit === "No") {
          yesNoIcon = "no";
          no.push(yesNoIcon);
        } else if (visit === "Yes") {
          yesNoIcon = "yes";
          yes.push(yesNoIcon);
        } else {
          yesNoIcon = null;
        }
      }
      const yesCounting = yes.length;
      return yesCounting;
    }
  },

  // eslint-disable-next-line consistent-return
  getNoCounting(category) {
    if (category.placemarks) {
      const yes = [];
      const no = [];
      let visit = "";
      let yesNoIcon = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        visit = category.placemarks[i].visited;
        if (visit === "No") {
          yesNoIcon = "no";
          no.push(yesNoIcon);
        } else if (visit === "Yes") {
          yesNoIcon = "yes";
          yes.push(yesNoIcon);
        } else {
          yesNoIcon = null;
        }
      }
      const noCounting = no.length;
      return noCounting;
    }
  },

  // eslint-disable-next-line consistent-return
  getYouShouldVisit(placemark) {
    let youShouldVisit = "";
    let visit = "";
    if (placemark) {
      visit = placemark.visited;
      if (visit === "No") {
        youShouldVisit = "What are you waiting for? Time to pay a visit to ";
      } else {
        youShouldVisit = "Although you have already been there, it is never a bad idea to visit again the ";
      }
    }
    return youShouldVisit;
  },
};
