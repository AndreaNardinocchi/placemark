/* This controller enables the 'report' rendering and updates on the 'station' page view. */

import { db } from "../models/db.js";
import { PlacemarkSpec, updatedPlacemarkSpec } from "../models/joi-schemas.js";
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
      // console.log(`Index Editing Placemark ${placemarkId} from Category ${categoryId}`);
      const category = await db.categoryStore.getCategoryById(categoryId);
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      const yesNoIcon = categoryAnalytics.getYesNoIcon(category);
      // console.log(placemark.yesNoIcon);
      console.log(`${yesNoIcon} + yesNoIcon placemarkControllers`);

      // We are showing/passing the category in the view
      const viewData = {
        title: `Edit Placemark ${placemark.title}`, // ${yesNoIcon}, // ${category}
        category: category,
        placemark: placemark,
        yesNoIcon: yesNoIcon,
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

      // request.cookieAuth.set(
      //   "placemark",
      //   // { id: user._id },
      //   { title: updatedTitle },
      //   { lat: updatedLat },
      //   { long: updatedLong },
      //   { address: updatedAddress },
      //   { country: updatedCountry },
      //   { address: updatedAddress },
      //   { website: updatedWebsite },
      //   { visited: updatedVisited },
      //   { description: updatedDescription }
      // );

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
        ttl: 1000 * 60 * 60 * 24, // Cookie expires in 1 day
        isHttpOnly: true, // Make cookie inaccessible to JavaScript
        isSecure: true,
      });

      request.cookieAuth.set({
        ...updatedPlacemark,
        ttl: 1000 * 60 * 60 * 24, // Cookie expires in 1 day
        isHttpOnly: true, // Make cookie inaccessible to JavaScript
        isSecure: true, // Use secure cookies
      });

      // console.log(`Editing Placemark ${placemarkId} from Category ${categoryId}`);
      // console.log(`updating ${updatedVisited}`);
      // console.log(`updating placemark.visited ${placemark.visited}`);
      return h.redirect(`/category/${categoryId}`);
    },
  },
};
