/* This util js file contains methods used for the both dashboard and station views */

export const somethingAnalytics = {
  // This method is used to sort stations in alphabetical order https://www.youtube.com/watch?v=CTHhlx25X-U
  getSortedCategories(categories) {
    const sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title));
    console.log(categories);
    return sortedCategories;
  },

  getAccountCategories0(categories) {
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
    });
    // eslint-disable-next-line prefer-const
    let accCat0 = accCats[0];
    return accCat0;
  },

  getAccountCategoriesId0(categories) {
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
    });
    // eslint-disable-next-line prefer-const
    let accCatId0 = accCatsId[0];
    console.log(` The accCatId0 ${accCatId0}`);
    return accCatId0;
  },

  getAccountCategories1(categories) {
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
    });
    // eslint-disable-next-line prefer-const
    let accCatId1 = accCatsId[1];

    return accCatId1;
  },

  getAccountCategories2(categories) {
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
    });
    // eslint-disable-next-line prefer-const
    let accCat2 = accCats[2];
    return accCat2;
  },

  getAccountCategoriesId2(categories) {
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
    });
    // eslint-disable-next-line prefer-const
    let accCatId2 = accCatsId[2];
    return accCatId2;
  },

  getAccountCategories3(categories) {
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
    return accCat3;
  },

  getAccountCategoriesId3(categories) {
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
    });
    // eslint-disable-next-line prefer-const
    let accCatId3 = accCatsId[3];
    return accCatId3;
  },
};
