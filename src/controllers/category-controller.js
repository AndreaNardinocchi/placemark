import { db } from "../models/db.js";
import { placemarkSpec, updatedPlacemarkSpec } from "../models/joi-schemas.js";
import { dashboardAnalytics } from "../utils/dashboard-analytics.js";
import { categoryAnalytics } from "../utils/category-analytics.js";
import { somethingAnalytics } from "../utils/something-analytics.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      // We are retrieving/extracting the placemark
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const placemark = await db.placemarkStore.getAllPlacemarks(category);

      await somethingAnalytics.getCategoryData(category);
      // const placemarkId = await db.placemarkStore.getPlacemarkById(request.params.id);
      // const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
      // const yesNoIcon = categoryAnalytics.getYesNoIcon(placemark);
      // console.log(`${yesNoIcon} + categoryControllers`);

      const imageCode = categoryAnalytics.getImageCode(category);
      const backgroundColor = categoryAnalytics.getBackgroundColor(category);
      const placemarkSum = categoryAnalytics.countPlacemarks(category);
      console.log(`${placemark.placemarkSum} checking placemarkSum`);

      // We are showing/passing the category in the view
      const viewData = {
        title: " Placemark ", // ${category}
        category: category,
        imageCode: imageCode,
        backgroundColor: backgroundColor,
        placemarkSum: placemarkSum,
        // yesNoIcon: yesNoIcon,
      };
      //     console.log(category.title);
      // console.log(`${imageCode} + categoryControllers`);

      // console.log(imageCode);
      // console.log("Hey");
      return h.view("category-view", viewData); // category-view.hbs is returned
    },
  },

  addPlacemark: {
    validate: {
      payload: placemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("category-view", { title: "Add placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      // We are retrieving/extracting the category
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newPlacemark = {
        /** The inputted data from the form will get here (payload),
         * and we stick them to a placemark object (title, artist, duration), and
         * finally we add the placemark to the database (placemarkStore) via the category
         * with its specific 'id' */
        user: loggedInUser,
        title: request.payload.title,
        lat: request.payload.lat,
        long: request.payload.long,
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
      // await db.placemarkStore.getplacemarksByCategoryId(category, placemark._id);
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect(`/category/${category._id}`);
    },
  },

  placemarkView: {
    handler: async function (request, h) {
      // We are retrieving/extracting the placemark
      const categoryId = request.params.categoryid; // await db.categoryStore.getCategoryById(request.params.id);
      const placemarkId = request.params.placemarkid;
      // console.log(`Editing Placemark ${placemarkId} from Category ${categoryId}`);

      // We are showing/passing the category in the view
      const viewData = {
        title: "Edit Placemark ", // ${category}
        category: await db.categoryStore.getCategoryById(categoryId),
        placemark: await db.placemarkStore.getPlacemarkById(placemarkId),
      };

      return h.view("placemark-view", viewData); // category-view.hbs is returned
    },
  },

  // updatePlacemark: {
  //   validate: {
  //     payload: updatedPlacemarkSpec,
  //     options: { abortEarly: false },
  //     failAction: function (request, h, error) {
  //       return h.view("report-view", { title: "Update placemark details error", errors: error.details }).takeover().code(400);
  //     },
  //   },
  //   handler: async function (request, h) {
  //     // const loggedInUser = request.auth.credentials;
  //     // const user = await db.userStore.getUserById(loggedInUser._id);
  //     // const categoryId = request.params.categoryid; // await db.categoryStore.getCategoryById(request.params.id);
  //     const categoryId = await db.categoryStore.getCategoryById(request.params.id);
  //     const placemarkId = await db.placemarkStore.getPlacemarkById(request.params.id);

  //     // const placemarkId = request.params.placemarkid;
  //     console.log(`Editing Placemark ${placemarkId} from Category ${categoryId}`);

  //     // const placemark = await db.placemarkStore.getPlacemarkBy(request.params.id);
  //     const updatedTitle = request.payload.title;
  //     const updatedLong = request.payload.long;
  //     const updatedLat = request.payload.Lat;
  //     const updatedAddress = request.payload.address;
  //     const updatedCountry = request.payload.country;
  //     const updatedPhone = Number(request.payload.phone);
  //     const updatedWebsite = request.payload.website;
  //     const updatedVisited = request.payload.visited;
  //     const updatedDescription = request.payload.description;
  //     const updatedPlacemark = {
  //       // user: loggedInUser,
  //       title: updatedTitle,
  //       long: updatedLong,
  //       lat: updatedLat,
  //       address: updatedAddress,
  //       country: updatedCountry,
  //       phone: updatedPhone,
  //       website: updatedWebsite,
  //       visited: updatedVisited,
  //       description: updatedDescription,
  //       //  _id: user._id,
  //     };
  //     // The below 'updateUser()' function from the 'user-store.js' file will update the user's data
  //     // await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
  //     // The cookie 'user' will be created and will contain the user's email
  //     // console.log(request.cookieAuth);

  //     // h.cookieAuth.set("user", { id: user._id });
  //     request.cookieAuth.set(
  //       "placemark",
  //       { id: user._id },
  //       { title: updatedTitle },
  //       { long: updatedLong },
  //       { lat: updatedLat },
  //       { address: updatedAddress },
  //       { country: updatedCountry },
  //       { address: updatedAddress },
  //       { website: updatedWebsite },
  //       { visited: updatedVisited },
  //       { description: updatedDescription }
  //     );

  //     // request.cookieAuth.clear(user);

  //     // request.cookieAuth.set("user", { id: user._id }, user.country, user.addressCode, user.street, user.phoneNumber, user.email, user.password);
  //     // request.cookieAuth.clear();
  //     const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
  //     await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
  //     console.log(`updating ${visited}`);
  //     return h.redirect(`/category/${categoryId}`);
  //   },
  // },
};
