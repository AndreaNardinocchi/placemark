/* This controller enables the 'report' rendering and updates on the 'station' page view. */

import { db } from "../models/db.js";
import { PlacemarkSpec, updatedPlacemarkSpec } from "../models/joi-schemas.js";
import { categoryAnalytics } from "../utils/category-analytics.js";

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
        _id: placemark._id,
      };
      await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
      return h.redirect(`/category/${categoryId}`);
    },
  },

  placemark: {
    handler: async function (request, h) {
      const categoryId = request.params.id;
      const placemarkId = request.params.placemarkid;
      const category = await db.categoryStore.getCategoryById(categoryId);
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      console.log("This is the category id", categoryId);
      console.log("This is the placemark id", placemarkId);
      const travelMeans = categoryAnalytics.getTravelMeans(category);
      const youShouldVisit = categoryAnalytics.getYouShouldVisit(category);

      const viewData = {
        title: ` ${placemark.title} | #instaPlaceMark!`,
        titleShort: placemark.title,
        lat: placemark.lat,
        long: placemark.long,
        address: placemark.address,
        country: placemark.country,
        website: placemark.website,
        description: placemark.description,
        categoryId: categoryId,
        placemarkId: placemarkId,
        travelMeans: travelMeans,
        youShouldVisit: youShouldVisit,
      };
      return h.view("placemark", viewData);
    },
  },
};
