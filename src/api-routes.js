import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { trackApi } from "./api/track-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

  { method: "GET", path: "/api/tracks", config: trackApi.find },
  { method: "POST", path: "/api/categories/{id}/tracks", config: trackApi.create },
  { method: "DELETE", path: "/api/tracks", config: trackApi.deleteAll },
  { method: "GET", path: "/api/tracks/{id}", config: trackApi.findOne },
  { method: "DELETE", path: "/api/tracks/{id}", config: trackApi.deleteOne },
];
