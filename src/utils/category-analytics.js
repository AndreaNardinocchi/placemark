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

  // THIS WORKS
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
          yesNoIcon = "fas fa-solid fa-flag";
          no.push(yesNoIcon);
        } else if (visit === "Yes") {
          yesNoIcon = "fas fa-solid fa-check";
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
          yesNoIcon = "fas fa-solid fa-flag";
          no.push(yesNoIcon);
        } else if (visit === "Yes") {
          yesNoIcon = "fas fa-solid fa-check";
          yes.push(yesNoIcon);
        } else {
          yesNoIcon = null;
        }
      }
      const noCounting = no.length;
      return noCounting;
    }
  },

  // https://www.bing.com/search?q=calculate%20distance%20between%20geolocations%20node.js&qs=n&form=QBRE&sp=-1&lq=0&pq=calculate%20distance%20between%20geolocations%20node.js&sc=5-47&sk=&cvid=D62AA82E014D4729832525BD82DFBE20&ghsh=0&ghacc=0&ghpl=&ntref=1
  getMaxPOIdistance(category) {
    const lat1 = category.userLat;
    const long1 = category.userLong;
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in
    // eslint-disable-next-line prefer-const
    let long2 = 0;
    // eslint-disable-next-line prefer-const
    let lat2 = 0;
    let a = 0;
    let c = 0;
    let dLat = 0;
    let dLong = 0;
    let title = "";
    let country = "";
    // eslint-disable-next-line prefer-const, no-new-object
    let maxDistance = [];
    let distance = 0;
    if (category.placemarks) {
      for (let i = 0; i < category.placemarks.length; i += 1) {
        long2 = category.placemarks[i].long;
        lat2 = category.placemarks[i].lat;
        title = category.placemarks[i].title;
        country = category.placemarks[i].country;
        dLat = toRadians(lat2 - lat1);
        dLong = toRadians(long2 - long1);
        // eslint-disable-next-line no-const-assign
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        distance = R * c;
        maxDistance.push(distance);
      }
    }
    // https://www.w3schools.com/howto/howto_js_remove_decimals.as
    let resultMax = Math.trunc(Math.max(...maxDistance));
    if (resultMax === -Infinity) {
      resultMax = 0;
    } else {
      resultMax = `${resultMax} km away`;
    }
    console.log(resultMax);
    return resultMax;
  },

  // https://www.bing.com/search?q=calculate%20distance%20between%20geolocations%20node.js&qs=n&form=QBRE&sp=-1&lq=0&pq=calculate%20distance%20between%20geolocations%20node.js&sc=5-47&sk=&cvid=D62AA82E014D4729832525BD82DFBE20&ghsh=0&ghacc=0&ghpl=&ntref=1
  getMinPOIdistance(category) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = category.userLat;
    const long1 = category.userLong;
    const something = "";
    // eslint-disable-next-line prefer-const
    let long2 = 0;
    // eslint-disable-next-line prefer-const
    let lat2 = 0;
    let a = 0;
    let c = 0;
    let dLat = 0;
    let dLong = 0;
    let title = "";
    // let smallest = "";
    let country = "";
    // eslint-disable-next-line prefer-const
    let minDistance = [];
    let distance = 0;
    if (category.placemarks) {
      for (let i = 0; i < category.placemarks.length; i += 1) {
        long2 = category.placemarks[i].long;
        lat2 = category.placemarks[i].lat;
        title = category.placemarks[i].title;
        country = category.placemarks[i].country;
        dLat = toRadians(lat2 - lat1);
        dLong = toRadians(long2 - long1);
        // eslint-disable-next-line no-const-assign
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        distance = R * c;
        minDistance.push(distance);
      }
    }
    // https://www.w3schools.com/howto/howto_js_remove_decimals.asp
    console.log(minDistance);
    let resultMin = Math.trunc(Math.min(...minDistance));
    if (resultMin === Infinity) {
      resultMin = 0;
    } else {
      resultMin = `${resultMin} km away`;
    }
    return resultMin;
  },

  // eslint-disable-next-line consistent-return
  getLocal(category) {
    if (category.placemarks) {
      const abroad = [];
      const local = [];
      let localCounting = "";
      let abroadCounting = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          localCounting = "Yes";
          local.push(localCounting);
        } else {
          abroadCounting = "Yes";
          abroad.push(abroadCounting);
        }
      }
      localCounting = local.length;
      return localCounting;
    }
  },

  // eslint-disable-next-line consistent-return
  getLocalTravelIcon(category) {
    if (category.placemarks) {
      let destination = "";
      // const localTravelIcons = [];
      let localTravelIcon = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          localTravelIcon = "fas fa-solid fa-car";
        }
      }
      return localTravelIcon;
    }
  },

  // eslint-disable-next-line consistent-return
  getLocalIcon(category) {
    if (category.placemarks) {
      let localIcon = "";
      let abroadIcon = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          // eslint-disable-next-line quotes
          localIcon = "https://i.ibb.co/212J0q6c/ireland-mini-1.png";
        } else {
          abroadIcon = "https://i.ibb.co/mVhwZKmD/international-mini-1.png";
        }
      }
      return localIcon;
    }
  },

  // eslint-disable-next-line consistent-return
  getAbroad(category) {
    if (category.placemarks) {
      const abroad = [];
      const local = [];
      let localCounting = "";
      let abroadCounting = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          localCounting = "Yes";
          local.push(localCounting);
        } else {
          abroadCounting = "No";
          abroad.push(abroadCounting);
        }
      }
      abroadCounting = abroad.length;
      return abroadCounting;
    }
  },

  // eslint-disable-next-line consistent-return
  getAbroadIcon(category) {
    if (category.placemarks) {
      let localIcon = "";
      let abroadIcon = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          localIcon = "https://i.ibb.co/212J0q6c/ireland-mini-1.png";
        } else if (destination !== "Ireland") {
          abroadIcon = "https://i.ibb.co/mVhwZKmD/international-mini-1.png";
        } else {
          abroadIcon = null;
        }
      }
      return abroadIcon;
    }
  },

  // eslint-disable-next-line consistent-return
  getAbroadTravelIcon(category) {
    let destination = "";
    if (category.placemarks) {
      let abroadTravelIcon = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        if (destination !== "Ireland") {
          abroadTravelIcon = "fas fa-solid fa-plane";
        }
      }
      return abroadTravelIcon;
    }
  },

  // eslint-disable-next-line consistent-return
  getTravelMeans(category) {
    if (category.placemarks) {
      let travelMeans = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          travelMeans = "car";
        } else {
          travelMeans = "plane";
        }
      }
      return travelMeans;
    }
  },

  // eslint-disable-next-line consistent-return
  getYouShouldVisit(category) {
    if (category.placemarks) {
      let youShouldVisit = "";
      let visit = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        visit = category.placemarks[i].visited;
        if (visit === "No") {
          youShouldVisit = "What are you waiting for? Time to pay a visit to ";
        } else {
          youShouldVisit = "However, you have already been there, but it is never a bad idea to visit again ";
        }
      }
      return youShouldVisit;
    }
  },
};
