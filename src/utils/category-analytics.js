/* eslint-disable import/no-cycle */
import { db } from "../models/db.js";
// import { accountsController } from "../controllers/accounts-controller.js";
import { UserSpec } from "../models/joi-schemas.js";
import { userMongoStore } from "../models/mongo/user-mongo-store.js";

/* This util js file contains all methods used for the dashboard view */
export const categoryAnalytics = {
  //   // eslint-disable-next-line consistent-return
  //   getUserLat(user) {
  //     if (user) {
  //       let lat1 = null;
  //       for (let i = 0; i < 1; i += 1) {
  //         if (user.userLat) {
  //           lat1 = user[i].userLat;
  //         }
  //       }
  //       return lat1;
  //     }
  //   },

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
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      let placemarkSum = 0;
      let visit = "";
      let yesNoIcon = "";
      const yes = [];
      const no = [];
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        placemarkSum += 1;
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
      const noCounting = no.length;
      console.log(`This is ${yesCounting} and ${noCounting} and ${visit} and ${yesNoIcon} placemarkSum ${placemarkSum}`);
      return `${placemarkSum} `; // Visited: ${yesCounting} Not Visited: ${noCounting} `;
    }
  },

  // eslint-disable-next-line consistent-return
  getYesCounting(category) {
    if (category.placemarks) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      let gyn = 0;
      const yes = [];
      const no = [];
      let visit = "";
      let yesNoIcon = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        gyn += 1;
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
      const noCounting = no.length;
      console.log(`This is ${gyn} placemarkSum `);
      return `${yesCounting}`;
    }
  },

  // eslint-disable-next-line consistent-return
  getNoCounting(category) {
    if (category.placemarks) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      let gyn = 0;
      const yes = [];
      const no = [];
      let visit = "";
      let yesNoIcon = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        gyn += 1;
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
      const noCounting = no.length;
      console.log(`This is ${gyn} placemarkSum `);
      return `${noCounting}`;
    }
  },

  // eslint-disable-next-line consistent-return
  getYesNoIcon(category) {
    // const icon = [];
    let visit = "";
    let yesNoIcon = "";
    if (category.placemarks) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      for (let i = 0; i < category.placemarks.length; i += 1) {
        visit = category.placemarks[i].visited;
        if (visit === "Yes") {
          // yesNoIcon = visit.concat("fas fa-solid fa-flag");
          yesNoIcon = "fas fa-solid fa-check";
          // icon.length = [];
          // icon.push(yesNoIcon);
        } else if (visit === "No") {
          yesNoIcon = "fas fa-solid fa-flag";
          // icon.length = [];
          // icon.push(yesNoIcon);
        } else {
          yesNoIcon = null;
        }
      }
    }
    console.log(`This is ${yesNoIcon} on ${visit} yesNoIcon `);
    return ` ${yesNoIcon}`;
  },

  // eslint-disable-next-line consistent-return
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

  // https://www.bing.com/search?q=calculate%20distance%20between%20geolocations%20node.js&qs=n&form=QBRE&sp=-1&lq=0&pq=calculate%20distance%20between%20geolocations%20node.js&sc=5-47&sk=&cvid=D62AA82E014D4729832525BD82DFBE20&ghsh=0&ghacc=0&ghpl=&ntref=1

  // https://www.bing.com/search?q=calculate%20distance%20between%20geolocations%20node.js&qs=n&form=QBRE&sp=-1&lq=0&pq=calculate%20distance%20between%20geolocations%20node.js&sc=5-47&sk=&cvid=D62AA82E014D4729832525BD82DFBE20&ghsh=0&ghacc=0&ghpl=&ntref=1
  getMaxPOIdistance(category) {
    // const loggedInUser = request.auth.credentials;
    const lat1 = category.userLat;
    const long1 = category.userLong;
    // console.log("This is the title", lat3);
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in
    // Ensure coordinates are retrieved first
    // this.getCoordinatesLat1();
    // console.log(`This getCoord ${this.getCoordinatesLat1()}`);
    // this.getUserLat();
    // console.log(`This getCoord ${this.getUserLat()}`);

    // const lat1 = 51.89;
    // const long1 = -8.48;
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
    // let largest = "";
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
    // https://www.w3schools.com/howto/howto_js_remove_decimals.asp

    let resultMax = Math.trunc(Math.max(...maxDistance));
    if (resultMax === -Infinity) {
      resultMax = 0;
    } else {
      resultMax = `${resultMax} km away`;
    }
    console.log(resultMax);
    return resultMax; // `${Math.trunc(Math.max(...maxDistance))} km away`; // km away, ${title}, ${country}`;
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
    return resultMin; // `${Math.trunc(Math.min(...minDistance))} km away`;
    //  return `${Math.trunc(distance)} km away, ${title}, ${country}`;
  },

  // eslint-disable-next-line consistent-return
  getLocal(category) {
    if (category.placemarks) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      let gyn = 0;
      const abroad = [];
      const local = [];
      let localIcon = "";
      let abroadIcon = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        gyn += 1;
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          localIcon = "https://i.ibb.co/ZpbKJrwP/ireland-mini.png";
          local.push(localIcon);
        } else {
          abroadIcon = "https://i.ibb.co/tygp5m2/international-mini.png";
          abroad.push(abroadIcon);
        }
      }
      const localCounting = local.length;
      const abroadCounting = abroad.length;
      console.log(`This is local ${localCounting} and ${abroadCounting} `);
      return localCounting;
    }
  },

  // eslint-disable-next-line consistent-return
  getLocalIcon(category) {
    if (category.placemarks) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      let gyn = 0;
      const abroad = [];
      const local = [];
      let localIcon = "";
      let abroadIcon = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        gyn += 1;
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          // eslint-disable-next-line quotes
          localIcon = "https://i.ibb.co/ZpbKJrwP/ireland-mini.png";

          local.push(localIcon);
        } else {
          abroadIcon = "https://i.ibb.co/tygp5m2/international-mini.png";
          abroad.push(abroadIcon);
        }
      }
      const localCounting = local.length;
      const abroadCounting = abroad.length;
      console.log(`This is local ${localCounting} and ${abroadCounting} `);
      return localIcon;
    }
  },

  // eslint-disable-next-line consistent-return
  getAbroad(category) {
    if (category.placemarks) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      let gyn = 0;
      const abroad = [];
      const local = [];
      let localIcon = "";
      let abroadIcon = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        gyn += 1;
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          localIcon = "https://i.ibb.co/ZpbKJrwP/ireland-mini.png";
          local.push(localIcon);
        } else {
          abroadIcon = "https://i.ibb.co/tygp5m2/international-mini.png";
          abroad.push(abroadIcon);
        }
      }
      const localCounting = local.length;
      const abroadCounting = abroad.length;
      console.log(`This is local ${localCounting} and ${abroadCounting} ${localIcon} `);
      return abroadCounting;
    }
  },

  // eslint-disable-next-line consistent-return
  getAbroadIcon(category) {
    if (category.placemarks) {
      // const placemarks = await db.placemarkStore.getAllPlacemarks(category);
      let gyn = 0;
      const abroad = [];
      const local = [];
      let localIcon = "";
      let abroadIcon = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        gyn += 1;
        destination = category.placemarks[i].country;
        if (destination === "Ireland") {
          localIcon = "https://i.ibb.co/ZpbKJrwP/ireland-mini.png";
          local.push(localIcon);
        } else if (destination !== "Ireland") {
          abroadIcon = "https://i.ibb.co/tygp5m2/international-mini.png";
          abroad.push(abroadIcon);
        } else {
          abroadIcon = null;
        }
      }
      const localCounting = local.length;
      const abroadCounting = abroad.length;
      console.log(`This is local ${localCounting} and ${abroadCounting} `);
      return abroadIcon;
    }
  },

  // // eslint-disable-next-line consistent-return
  // placemarksOnAccount(category) {
  //   let showPlacemark = "";
  //   const showPlacemarks = [];
  //   if (category.placemarks) {
  //     // const placemarks = await db.placemarkStore.getAllPlacemarks(category);

  //     // Loop through all placemarks in the category
  //     for (let i = 0; i < category.placemarks.length; i += 1) {
  //       showPlacemark = category.placemarks[i].title;
  //       showPlacemarks.push(showPlacemark);
  //     }
  //   }
  //   console.log(`This is ${showPlacemarksyesCounting}`);
  //   return showPlacemarks; // Visited: ${yesCounting} Not Visited: ${noCounting} `;
  // },
};
