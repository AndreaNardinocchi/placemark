import { db } from "../models/db.js";
import { PlacemarkSpec, updatedPlacemarkSpec } from "../models/joi-schemas.js";
import { categoryAnalytics } from "../utils/category-analytics.js";
import { imageStore } from "../models/image-store.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      // const loggedInUser = request.auth.credentials;
      // We are retrieving/extracting the placemark
      const category = await db.categoryStore.getCategoryById(request.params.id);
      // const placemark = await db.placemarkStore.getAllPlacemarks(category);
      const imageCode = categoryAnalytics.getImageCode(category);
      const backgroundColor = categoryAnalytics.getBackgroundColor(category);
      const placemarkSum = categoryAnalytics.countPlacemarks(category);
      const yesCounting = categoryAnalytics.getYesCounting(category);
      const noCounting = categoryAnalytics.getNoCounting(category);
      const localTravelIcon = categoryAnalytics.getLocalTravelIcon(category);
      const abroadTravelIcon = categoryAnalytics.getAbroadTravelIcon(category);
      const maxDistance = categoryAnalytics.getMaxPOIdistance(category);
      const minDistance = categoryAnalytics.getMinPOIdistance(category);
      const localCounting = categoryAnalytics.getLocal(category);
      const abroadCounting = categoryAnalytics.getAbroad(category);
      const localIcon = categoryAnalytics.getLocalIcon(category);
      const abroadIcon = categoryAnalytics.getAbroadIcon(category);
      // We are showing/passing the category in the view
      const viewData = {
        title: `Placemark ${category.title}`, // ${category}
        category: category,
        imageCode: imageCode,
        backgroundColor: backgroundColor,
        placemarkSum: placemarkSum,
        yesCounting: yesCounting,
        noCounting: noCounting,
        localTravelIcon: localTravelIcon,
        abroadTravelIcon: abroadTravelIcon,
        maxDistance: maxDistance,
        minDistance: minDistance,
        localCounting: localCounting,
        abroadCounting: abroadCounting,
        localIcon: localIcon,
        abroadIcon: abroadIcon,
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
      //  const loggedInUser = request.auth.credentials;
      //  const user = await db.userStore.getUserById(loggedInUser._id);
      const category = await db.categoryStore.getCategoryById(request.params.id);
      console.log(`This is category.title ${category.title}`);
      if (request.payload.title === category.title) {
        return h.redirect("/");
      }
      const placemark = await db.placemarkStore.getAllPlacemarks(category);
      const newPlacemark = {
        /** The inputted data from the form will get here (payload),
         * and we stick them to a placemark object (title, artist, duration), and
         * finally we add the placemark to the database (placemarkStore) via the category
         * with its specific 'id' */
        //   user: loggedInUser,
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
