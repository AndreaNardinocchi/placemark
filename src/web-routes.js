import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { newsController } from "./controllers/news-controller.js";
import { lifestyleController } from "./controllers/lifestyle-controller.js";
import { testController } from "./controllers/test-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/account", config: accountsController.showAccount },
  { method: "GET", path: "/account/deleteuser/{id}", config: accountsController.deleteAccount },
  { method: "GET", path: "/account/edituser/", config: accountsController.showAccount },
  { method: "POST", path: "/account/updateuser/", config: accountsController.updateAccount },
  { method: "GET", path: "/taken-email", config: accountsController.takenEmail },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addplacemark", config: categoryController.addPlacemark },

  { method: "POST", path: "/category/{categoryid}/deleteplacemark/{id}", config: categoryController.deletePlacemark },
  { method: "GET", path: "/category/{id}/deleteplacemark/{placemarkid}", config: categoryController.deletePlacemark },

  { method: "POST", path: "/category/{id}/uploadimage", config: categoryController.uploadImage },
  { method: "GET", path: "/category/{id}/deleteimage", config: categoryController.deleteImage },

  { method: "GET", path: "/category/{categoryid}/editplacemark/{placemarkid}", config: placemarkController.index },
  { method: "POST", path: "/category/{categoryid}/updateplacemark/{placemarkid}", config: placemarkController.updatePlacemark },

  { method: "GET", path: "/category/{id}/placemark/{placemarkid}", config: testController.index },

  { method: "GET", path: "/lifestyle", config: lifestyleController.index },
  { method: "GET", path: "/news", config: newsController.index },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  { method: "POST", path: "/category/{id}/placemark/{placemarkid}/uploadimage", config: testController.uploadImage },
  { method: "GET", path: "/category/{id}/placemark/{placemarkid}/deleteimage/{index}", config: testController.deleteImage },
];

// method: "POST", path: "/category/{id}/placemark/{placemarkid}/uploadimage",
