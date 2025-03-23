import { getDistance } from "geolib";
import { db } from "../models/db.js";
import { PlacemarkSpec, updatedPlacemarkSpec } from "../models/joi-schemas.js";
import { categoryAnalytics } from "../utils/category-analytics.js";
import { imageStore } from "../models/image-store.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userDetails = await db.userStore.getUserById(loggedInUser._id);
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const imageCode = categoryAnalytics.getImageCode(category);
      const backgroundColor = categoryAnalytics.getBackgroundColor(category);
      const placemarkSum = categoryAnalytics.countPlacemarks(category);
      const yesCounting = categoryAnalytics.getYesCounting(category);
      const noCounting = categoryAnalytics.getNoCounting(category);

      /* --- Setting variables for counting abroad and local counts and icons ----*/

      let localTravelIcon = "";
      let abroadTravelIcon = "";
      // eslint-disable-next-line prefer-const
      let local = [];
      // eslint-disable-next-line prefer-const
      let abroad = [];
      let localCounting = "";
      let abroadCounting = "";
      let localIcon = "";
      let abroadIcon = "";
      let destination = "";
      // Loop through all placemarks in the category
      for (let i = 0; i < category.placemarks.length; i += 1) {
        destination = category.placemarks[i].country;
        destination = destination.toLowerCase().trim();
        // eslint-disable-next-line prefer-const
        let userCountry = userDetails.country.toLowerCase().trim();
        if (destination === userCountry) {
          // eslint-disable-next-line quotes
          localIcon = "https://i.ibb.co/Q7J1t5jt/102-lokasimanusia-mini.jpg";
          localCounting = "Yes";
          local.push(localCounting);
          localTravelIcon = "fas fa-solid fa-car";
        } else {
          abroadIcon = "https://i.ibb.co/mVhwZKmD/international-mini-1.png";
          abroadCounting = "No";
          abroad.push(abroadCounting);
          abroadTravelIcon = "fas fa-solid fa-plane";
        }
      }
      localCounting = local.length;
      abroadCounting = abroad.length;

      /* --------- The below section calculates the distance between the user's and the furthest and closest placemark locations ----- */

      // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
      const lat1 = userDetails.userLat;
      const long1 = userDetails.userLong;
      console.log("coords", lat1, long1);
      const toRadians = (degrees) => degrees * (Math.PI / 180);
      const R = 6371; // Radius of the Earth in km
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
      let allDistances = [];
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
          allDistances.push(distance);
          // This is just for comparison of the values between the above method with the module 'geolib' https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
          const dist = getDistance({ latitude: lat1, longitude: long1 }, { latitude: lat2, longitude: long2 }) / 1000;
          console.log(dist);
        }
      }
      // https://www.delftstack.com/howto/javascript/javascript-round-to-2-decimal-places/
      let resultMax = Math.max(...allDistances);
      console.log("MaxDist", allDistances);
      if (resultMax === -Infinity) {
        resultMax = 0;
      } else {
        const maxRounded = resultMax.toFixed(2);
        resultMax = `${maxRounded} km away`;
      }

      let resultMin = Math.min(...allDistances);
      console.log("MinDist", allDistances);
      if (resultMin === Infinity) {
        resultMin = 0;
      } else {
        const minRounded = resultMin.toFixed(2);
        resultMin = `${minRounded} km away`;
      }

      // We are showing/passing the category in the view
      const viewData = {
        title: `Placemark ${category.title}`,
        category: category,
        imageCode: imageCode,
        backgroundColor: backgroundColor,
        placemarkSum: placemarkSum,
        yesCounting: yesCounting,
        noCounting: noCounting,
        localTravelIcon: localTravelIcon,
        abroadTravelIcon: abroadTravelIcon,
        localCounting: localCounting,
        abroadCounting: abroadCounting,
        localIcon: localIcon,
        abroadIcon: abroadIcon,
        resultMax: resultMax,
        resultMin: resultMin,
      };
      // category-view.hbs is returned
      return h.view("category-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("category-view", { title: "Add placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      // We are retrieving/extracting the category
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newPlacemark = {
        /** The inputted data from the form will get here (payload),
         * and we stick them to a placemark object, and
         * finally we add the placemark to the database (placemarkStore) via the category
         * with its specific 'id' */
        title: request.payload.title,
        lat: Number(request.payload.lat),
        long: Number(request.payload.long),
        address: request.payload.address,
        country: request.payload.country,
        phone: Number(request.payload.phone),
        website: request.payload.website,
        visited: request.payload.visited,
        description: request.payload.description,
      };
      await db.placemarkStore.addPlacemark(category._id, newPlacemark);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      // We are retrieving/extracting the category
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect(`/category/${category._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          category.img = url;
          await db.categoryStore.updateCategory(category);
        }
        return h.redirect(`/category/${category._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect("/");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (category.img) {
          await imageStore.deleteImage(category.img);
          category.img = null;
          await db.categoryStore.updateCategory(category);
        }
        return h.redirect(`/category/${category._id}`);
      } catch (err) {
        console.log("Error during image deletion:", err);
        return h.redirect(`/category/${category._id}`); // Redirect even in case of error
      }
    },
  },
};
