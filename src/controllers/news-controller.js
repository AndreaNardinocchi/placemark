/* This controller enables the 'Lifestyle' page view to render. */

export const newsController = {
  index: {
    handler: async function (request, h) {
      const viewData = {
        title: "News worldwide",
      };
      return h.view("news-view", viewData);
    },
  },
};
