/* This controller enables the 'report' rendering and updates on the 'station' page view. */

import { db } from "../models/db.js";
import { placemarkSpec, updatedPlacemarkSpec } from "../models/joi-schemas.js";
import { dashboardAnalytics } from "../utils/dashboard-analytics.js";
import { categoryAnalytics } from "../utils/category-analytics.js";
import { somethingAnalytics } from "../utils/something-analytics.js";
import { categoryController } from "./category-controller.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      // We are retrieving/extracting the placemark
      const categoryId = request.params.categoryid; // await db.categoryStore.getCategoryById(request.params.id);
      const placemarkId = request.params.placemarkid;
      console.log(`Index Editing Placemark ${placemarkId} from Category ${categoryId}`);

      // We are showing/passing the category in the view
      const viewData = {
        title: "Edit Placemark ", // ${category}
        category: await db.categoryStore.getCategoryById(categoryId),
        placemark: await db.placemarkStore.getPlacemarkById(placemarkId),
      };

      return h.view("placemark-view", viewData); // category-view.hbs is returned
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
      const updatedLong = request.payload.long;
      const updatedLat = request.payload.Lat;
      const updatedAddress = request.payload.address;
      const updatedCountry = request.payload.country;
      const updatedPhone = Number(request.payload.phone);
      const updatedWebsite = request.payload.website;
      const updatedDescription = request.payload.description;
      const updatedPlacemark = {
        title: updatedTitle,
        long: updatedLong,
        lat: updatedLat,
        address: updatedAddress,
        country: updatedCountry,
        phone: updatedPhone,
        website: updatedWebsite,
        description: updatedDescription,
      };
      // request.cookieAuth.set(
      //   "placemark",
      //   { title: updatedTitle },
      //   { long: updatedLong },
      //   { lat: updatedLat },
      //   { address: updatedAddress },
      //   { country: updatedCountry },
      //   { address: updatedAddress },
      //   { website: updatedWebsite },
      //   { description: updatedDescription }
      // );

      await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
      console.log(`Editing Placemark ${placemarkId} from Category ${categoryId}`);
      console.log(`updating ${updatedWebsite}`);
      return h.redirect(`/category/${categoryId}`);
    },
  },
};
