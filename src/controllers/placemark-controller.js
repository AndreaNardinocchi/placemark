/* This controller enables the 'report' rendering and updates on the 'station' page view. */

import { db } from "../models/db.js";
import { PlacemarkSpec, updatedPlacemarkSpec } from "../models/joi-schemas.js";
import { categoryAnalytics } from "../utils/category-analytics.js";
import { imageStore } from "../models/image-store.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      // We are retrieving/extracting the placemark
      const categoryId = request.params.categoryid;
      const placemarkId = request.params.placemarkid;
      const category = await db.categoryStore.getCategoryById(categoryId);
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      // We are showing/passing the category in the view
      const viewData = {
        title: `Edit Placemark ${placemark.title}`,
        category: category,
        placemark: placemark,
      };
      // category-view.hbs is returned
      return h.view("placemark-view", viewData);
    },
  },

  updatePlacemark: {
    validate: {
      payload: updatedPlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Update placemark details error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const categoryId = request.params.categoryid;
      const category = await db.categoryStore.getCategoryById(categoryId);
      const placemarkId = request.params.placemarkid;
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      const updatedTitle = request.payload.title;
      const updatedLat = request.payload.lat;
      const updatedLong = request.payload.long;
      const updatedAddress = request.payload.address;
      const updatedCountry = request.payload.country;
      const updatedPhone = request.payload.phone;
      const updatedWebsite = request.payload.website;
      const updatedVisited = request.payload.visited;
      const updatedDescription = request.payload.description;
      const updatedPlacemark = {
        title: updatedTitle,
        lat: updatedLat,
        long: updatedLong,
        address: updatedAddress,
        country: updatedCountry,
        phone: updatedPhone,
        website: updatedWebsite,
        visited: updatedVisited,
        description: updatedDescription,
      };
      await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
      request.cookieAuth.set({
        placemarkId: placemark._id,
        title: updatedTitle,
        lat: updatedLat,
        long: updatedLong,
        address: updatedAddress,
        country: updatedCountry,
        website: updatedWebsite,
        visited: updatedVisited,
        description: updatedDescription,
        // ttl: 1000 * 60 * 60 * 24, // Cookie expires in 1 day
        // isHttpOnly: true, // Make cookie inaccessible to JavaScript
        // isSecure: true,
      });

      // request.cookieAuth.set({
      //   ...updatedPlacemark,
      //   ttl: 1000 * 60 * 60 * 24, // Cookie expires in 1 day
      //   isHttpOnly: true, // Make cookie inaccessible to JavaScript
      //   isSecure: true, // Use secure cookies
      // });
      return h.redirect(`/category/${categoryId}`);
    },
  },

  placemark: {
    handler: async function (request, h) {
      const viewData = {
        title: "#instaPlaceMark!",
      };
      return h.view("placemark", viewData);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.categoryid);
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
        console.log("Upload image", category);
        console.log("Upload image", placemark);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          await db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/category/${category._id}/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${category._id}/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
