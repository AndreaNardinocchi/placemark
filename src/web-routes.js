import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addtrack", config: categoryController.addTrack },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },

  { method: "POST", path: "/category/{categoryid}/deletetrack/{id}", config: categoryController.deleteTrack },
  { method: "GET", path: "/category/{id}/deletetrack/{trackid}", config: categoryController.deleteTrack },

  { method: "GET", path: "/account", config: accountsController.showAccount },
  { method: "GET", path: "/account/deleteuser/{id}", config: accountsController.deleteAccount },
  { method: "GET", path: "/account/edituser/", config: accountsController.showAccount },
  { method: "POST", path: "/account/updateuser/", config: accountsController.updateAccount },
];
