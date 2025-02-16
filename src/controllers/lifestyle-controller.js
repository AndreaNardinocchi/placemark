/* This controller enables the 'Lifestyle' page view to render. */

export const lifestyleController = {
  index: {
    handler: async function (request, h) {
      const viewData = {
        title: "About lifestyle",
      };
      return h.view("lifestyle-view", viewData);
    },
  },
};
