import { db } from "../models/db.js";
import { TrackSpec } from "../models/joi-schemas.js";
import { dashboardAnalytics } from "../utils/dashboard-analytics.js";
import { categoryAnalytics } from "../utils/category-analytics.js";
import { somethingAnalytics } from "../utils/something-analytics.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      // We are retrieving/extracting the playlist
      const category = await db.categoryStore.getCategoryById(request.params.id);

      await somethingAnalytics.getCategoryData(category);

      const imageCode = categoryAnalytics.getImageCode(category);
      // console.log(imageCode);

      // We are showing/passing the category in the view
      const viewData = {
        title: "Placemark Category",
        category: category,
        imageCode: imageCode,
      };
      console.log(category.title);
      // console.log(imageCode);
      // console.log("Hey");
      return h.view("category-view", viewData); // category-view.hbs is returned
    },
  },

  addTrack: {
    validate: {
      payload: TrackSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("category-view", { title: "Add track error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      // We are retrieving/extracting the category
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newTrack = {
        /** The inputted data from the form will get here (payload),
         * and we stick them to a track object (title, artist, duration), and
         * finally we add the track to the database (trackStore) via the category
         * with its specific 'id' */
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.trackStore.addTrack(category._id, newTrack);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deleteTrack: {
    handler: async function (request, h) {
      // We are retrieving/extracting the category
      const category = await db.categoryStore.getCategoryById(request.params.id);
      // await db.trackStore.getTracksByCategoryId(category, track._id);
      await db.trackStore.deleteTrack(request.params.trackid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
