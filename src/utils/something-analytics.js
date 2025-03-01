/* This util js file contains methods used for the both dashboard and station views */
// import { categoryAnalytics } from "./category-analytics.js";
// eslint-disable-next-line import/no-cycle
import { db } from "../models/db.js";
import { categoryAnalytics } from "./category-analytics.js";
import { dashboardAnalytics } from "./dashboard-analytics.js";

export const somethingAnalytics = {
  // This method is used to sort stations in alphabetical order https://www.youtube.com/watch?v=CTHhlx25X-U
  getSortedCategories(categories) {
    const sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title));
    console.log(categories);
    return sortedCategories;
  },

  // getUserLatitudes(users) {
  //   let userLat = "";
  //   // const userLats = [];

  //   // Iterate over the users array to collect all latitudes

  //   // users.forEach((user) => {
  //   for (let i = 0; i < users.length; i += 1) {
  //     userLat = users[i].userLat;

  //     // userLats.push(userLat);
  //   }

  //   // Get the first user's latitude, or adjust to your needs
  //   // const userLat0 = userLats[0];

  //   // Log the collected latitudes (optional)
  //   console.log(`The user latitudes are: ${users.length}`);

  //   return userLat; // or return the entire userLats array, depending on your use case
  // },

  // getBodyCopy(categories) {
  //   let bodyCopy = "";
  //   // const copy = [];
  //   categories.forEach((category) => {
  //     if (category.title === "Restaurants") {
  //       bodyCopy = category.bodyCopy;
  //       bodyCopy =
  //         "A cozy, stylish ambiance with warm lighting and elegant decor. The menu features a variety of expertly crafted dishes made from fresh, locally sourced ingredients. Friendly staff provide impeccable service, ensuring a memorable dining experience. It's the perfect spot for any occasion.";
  //       // copy.push(bodyCopy);
  //     } else if (category.title === "Museums") {
  //       bodyCopy =
  //         "A captivating journey through history, art, and culture. Its thoughtfully curated exhibits showcase a diverse collection of artifacts, paintings, and sculptures, creating an immersive experience. With interactive displays and knowledgeable staff, it’s a place for discovery, learning, and inspiration.";
  //     } else if (category.title === "Beaches") {
  //       bodyCopy =
  //         "A serene escape, with soft golden sand stretching under the bright sun. Waves gently lap at the shore, creating a soothing rhythm. The air is filled with the salty scent of the sea, while the turquoise water sparkles under the sunlight, inviting relaxation and a peaceful retreat.";
  //     } else if (category.title === "Parks") {
  //       bodyCopy =
  //         "A peaceful retreat, offering lush green lawns, towering trees, and winding pathways. Birds chirp in the trees, while visitors enjoy picnics or leisurely strolls. Playgrounds hum with children's laughter, and serene ponds reflect the sky, creating a perfect blend of nature and relaxation.";
  //     }
  //   });
  //   console.log("This is the body copy", bodyCopy);
  //   // const copy0 = copy[0];
  //   // console.log("This is the body copy", copy0);
  //   return bodyCopy;
  // },
  // return null;

  // eslint-disable-next-line no-dupe-keys
  // getBodyCopy1(categories) {
  //   let bodyCopy = null;
  //   const copy = [];
  //   categories.forEach((category) => {
  //     // for (let i = 0; i < 1; i += 1) {
  //     // if (category.title === "Restaurants") {
  //     //   bodyCopy =
  //     //     "A cozy, stylish ambiance with warm lighting and elegant decor. The menu features a variety of expertly crafted dishes made from fresh, locally sourced ingredients. Friendly staff provide impeccable service, ensuring a memorable dining experience. It's the perfect spot for any occasion.";
  //     //   copy.push(bodyCopy);
  //     // } else
  //     if (category.title === "Museums") {
  //       bodyCopy =
  //         "A captivating journey through history, art, and culture. Its thoughtfully curated exhibits showcase a diverse collection of artifacts, paintings, and sculptures, creating an immersive experience. With interactive displays and knowledgeable staff, it’s a place for discovery, learning, and inspiration.";
  //       copy.push(bodyCopy);
  //     } else if (category.title === "Beaches") {
  //       bodyCopy =
  //         "A serene escape, with soft golden sand stretching under the bright sun. Waves gently lap at the shore, creating a soothing rhythm. The air is filled with the salty scent of the sea, while the turquoise water sparkles under the sunlight, inviting relaxation and a peaceful retreat.";
  //     } else if (category.title === "Parks") {
  //       bodyCopy =
  //         "A peaceful retreat, offering lush green lawns, towering trees, and winding pathways. Birds chirp in the trees, while visitors enjoy picnics or leisurely strolls. Playgrounds hum with children's laughter, and serene ponds reflect the sky, creating a perfect blend of nature and relaxation.";
  //     }
  //   });
  //   // console.log("This is the body copy", bodyCopy);
  //   const copy1 = copy[1];
  //   console.log("This is the body copy", copy1);
  //   return copy1;
  // },

  getAccountCategories0(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);
    // console.log(titles);
    // Access each title individually
    let accCat = "";
    // eslint-disable-next-line prefer-const
    let accCats = [];
    // eslint-disable-next-line prefer-const
    let accCatsId = [];
    let accCatId = "";
    accCats.slice();
    categories.forEach((category) => {
      accCat = category.title;
      accCatId = category._id;
      accCats.push(accCat);
      accCatsId.push(accCatId);
      // console.log(accCat);
    });
    // eslint-disable-next-line prefer-const
    let accCat0 = accCats[0];
    // eslint-disable-next-line prefer-const
    let accCatId0 = accCatsId[0];
    console.log(` The accCat0 ${accCats}`);
    return accCat0;
  },

  getAccountCategoriesId0(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);
    // console.log(titles);
    // Access each title individually
    let accCat = "";
    // eslint-disable-next-line prefer-const
    let accCats = [];
    // eslint-disable-next-line prefer-const
    let accCatsId = [];
    let accCatId = "";
    accCats.slice();
    categories.forEach((category) => {
      accCat = category.title;
      accCatId = category._id;
      accCats.push(accCat);
      accCatsId.push(accCatId);
      // console.log(accCat);
    });
    // eslint-disable-next-line prefer-const
    let accCat0 = accCats[0];
    // eslint-disable-next-line prefer-const
    let accCatId0 = accCatsId[0];
    console.log(` The accCatId0 ${accCatId0}`);
    return accCatId0;
  },

  getAccountCategories1(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);
    // console.log(titles);
    // Access each title individually
    let accCat = "";
    let accCatId = "";
    // eslint-disable-next-line prefer-const
    let accCats = [];
    accCats.slice();
    categories.forEach((category) => {
      accCat = category.title;
      accCatId = category._id;
      accCats.push(accCat);
      console.log(accCat);
      console.log(`ID: ${accCatId}`);
    });
    console.log(accCats);
    // eslint-disable-next-line prefer-const
    let accCat1 = accCats[1];
    console.log(accCat1);
    return accCat1;
  },

  getAccountCategoriesId1(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);
    // console.log(titles);
    // Access each title individually
    let accCat = "";
    // eslint-disable-next-line prefer-const
    let accCats = [];
    // eslint-disable-next-line prefer-const
    let accCatsId = [];
    let accCatId = "";
    accCats.slice();
    categories.forEach((category) => {
      accCat = category.title;
      accCatId = category._id;
      accCats.push(accCat);
      accCatsId.push(accCatId);
      // console.log(accCat);
    });
    // eslint-disable-next-line prefer-const
    let accCat0 = accCats[0];
    // eslint-disable-next-line prefer-const
    let accCatId1 = accCatsId[1];

    return accCatId1;
  },

  getAccountCategories2(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);
    // console.log(titles);
    // Access each title individually
    let accCat = "";
    // eslint-disable-next-line prefer-const
    let accCats = [];
    // eslint-disable-next-line prefer-const
    let accCatsId = [];
    let accCatId = "";
    accCats.slice();
    categories.forEach((category) => {
      accCat = category.title;
      accCatId = category._id;
      accCats.push(accCat);
      accCatsId.push(accCatId);
      // console.log(accCat);
    });
    // eslint-disable-next-line prefer-const
    let accCat2 = accCats[2];
    // eslint-disable-next-line prefer-const
    let accCatId0 = accCatsId[0];
    // console.log(` The accCatId0 ${accCatId0}`);
    return accCat2;
  },

  getAccountCategoriesId2(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);
    // console.log(titles);
    // Access each title individually
    let accCat = "";
    // eslint-disable-next-line prefer-const
    let accCats = [];
    // eslint-disable-next-line prefer-const
    let accCatsId = [];
    let accCatId = "";
    accCats.slice();
    categories.forEach((category) => {
      accCat = category.title;
      accCatId = category._id;
      accCats.push(accCat);
      accCatsId.push(accCatId);
      // console.log(accCat);
    });
    // eslint-disable-next-line prefer-const
    let accCat0 = accCats[0];
    // eslint-disable-next-line prefer-const
    let accCatId2 = accCatsId[2];
    // console.log(` The accCatId0 ${accCatId0}`);
    return accCatId2;
  },

  getAccountCategories3(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);
    // console.log(titles);
    // Access each title individually
    let accCat = "";
    let accCatId = "";
    // eslint-disable-next-line prefer-const
    let accCats = [];
    accCats.slice();
    categories.forEach((category) => {
      accCat = category.title;
      accCatId = category._id;
      accCats.push(accCat);
      console.log(accCat);
      console.log(`ID: ${accCatId}`);
    });
    console.log(accCats);
    // eslint-disable-next-line prefer-const
    let accCat3 = accCats[3];
    // console.log(accCat1);
    return accCat3;
  },

  getAccountCategoriesId3(categories) {
    // const data = categories;
    // // Get titles from the array
    // const titles = data.map((item) => item.title);
    // console.log(titles);
    // Access each title individually
    let accCat = "";
    // eslint-disable-next-line prefer-const
    let accCats = [];
    // eslint-disable-next-line prefer-const
    let accCatsId = [];
    let accCatId = "";
    accCats.slice();
    categories.forEach((category) => {
      if (category) accCat = category.title;
      accCatId = category._id;
      accCats.push(accCat);
      accCatsId.push(accCatId);
      // console.log(accCat);
    });
    // eslint-disable-next-line prefer-const
    let accCat0 = accCats[0];
    // eslint-disable-next-line prefer-const
    let accCatId3 = accCatsId[3];
    return accCatId3;
  },

  // TO RETHINK THIS ONE
  /* The method getStationData(station); is basically the same method as the reportStore.updateReport() one and 
  will make the latest station details show on the dashboard view (passing them through to the latter). 
  https://stackoverflow.com/questions/6439915/how-to-set-a-javascript-object-values-dynamically/6439954#6439954 */
  //   async getCategoryData(category) {
  //   //   const placemarks = await db.placemarkStore.getPlacemarkById(category._id);
  //   //   // eslint-disable-next-line no-restricted-globals
  //   //   if (category.placemarks) {
  //   //     // const placemarkSum = categoryAnalytics.countPlacemarks(category);
  //   //     const placemarkSum = dashboardAnalytics.countPlacemarks(category);
  //   //     const newCategory = {};
  //   //     newCategory["placemarkSum"] = placemarkSum;
  //   //     // // eslint-disable-next-line dot-notation
  //   //     // newCategory["country"] = country;
  //   //     console.log(`somethingAnalytics ${placemarkSum}`);
  //   //     await db.categoryStore.updateCategory(category, newCategory);
  //   //   }
  //   // },
};
