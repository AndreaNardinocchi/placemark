import Joi from "joi";
// import JoiDate from "@joi/date";
import dotenv from "dotenv";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import Cookie from "@hapi/cookie";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://tutors.dev/lab/wit-hdip-comp-sci-2024-full-stack-1/topic-02-hapi/unit-2/book-1-playtime-0-2-0/Exercises and https://github.com/motdotla/dotenv#readme
const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  await server.register(Vision);
  await server.register(Cookie); // registering the plugin
  server.validator(Joi); // We are setting the validator after we have registered the plugins.
  // server.validator(JoiDate);

  /**
   * Configuring authentication after the plugin is registered
   * we have defined an authentication strategy for all routes
   * */
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  /**
   * If you comment out this line, the app will work again (sort of),
   * but our sessions will be disabled
   */
  server.auth.default("session");
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  db.init("mongo");
  server.route(webRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
