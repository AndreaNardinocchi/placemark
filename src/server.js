import Joi from "joi";
// import JoiDate from "@joi/date";
import dotenv from "dotenv";
import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import jwt from "hapi-auth-jwt2";
import HapiSwagger from "hapi-swagger";
import path from "path";
import { fileURLToPath } from "url";
import Cookie from "@hapi/cookie";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function importEnvs() {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    // process.exit(1);
  }
}

// https://tutors.dev/lab/wit-hdip-comp-sci-2024-full-stack-1/topic-02-hapi/unit-2/book-1-playtime-0-2-0/Exercises and https://github.com/motdotla/dotenv#readme

// if (result.error) {
//   console.log(result.error.message);
//   // process.exit(1);
// }

const swaggerOptions = {
  info: {
    title: "Placemark API",
    version: "0.1",
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ jwt: [] }],
};

async function init() {
  importEnvs();
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: {
      cors: {
        origin: ["https://placemarkyourjourney.netlify.app"],
        // "http://localhost:5173",
        credentials: true,
        headers: ["Accept", "Authorization", "Content-Type"],
        additionalHeaders: ["X-Requested-With"],
      },
    },

    // routes: {
    //   cors: {
    //     // origin: ["http://localhost:5173"], // You can replace "*" with ["http://localhost:5173"] for more security
    //     // additionalHeaders: ["cache-control", "x-requested-with"],
    //     credentials: true, // Only if you're using cookies/auth
    //   },
    // },
  });

  await server.register(Cookie); // registering the plugin
  await server.register(jwt); // Import and register the plugin
  server.validator(Joi); // We are setting the validator after we have registered the plugins.

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

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

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  /**
   * If you comment out this line, the app will work again (sort of),
   * but our sessions will be disabled
   */

  server.auth.default("session");

  db.init("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();

  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
