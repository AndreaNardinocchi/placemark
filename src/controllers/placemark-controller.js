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
      const travelMeans = categoryAnalytics.getTravelMeans(placemark);
      const youShouldVisit = categoryAnalytics.getYouShouldVisit(placemark);

      /* The below section calculates the distance between the user and the placemark location */
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
      let distance = 0;
      if (category.placemarks) {
        for (let i = 0; i < category.placemarks.length; i += 1) {
          long2 = placemark.long;
          lat2 = placemark.lat;
          title = placemark.title;
          country = placemark.country;
          dLat = toRadians(lat2 - lat1);
          dLong = toRadians(long2 - long1);
          // eslint-disable-next-line no-const-assign
          a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
          c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          distance = R * c;
        }
      }
      // https://stackoverflow.com/questions/3163070/javascript-displaying-a-float-to-2-decimal-places
      distance = Number(distance).toFixed(2);
      if (distance === -Infinity) {
        distance = 0;
      } else {
        distance = `${distance} km away`;
      }

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
        distance: distance,
      };
      return h.view("placemark", viewData);
    },
  },
};
