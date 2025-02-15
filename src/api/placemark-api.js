import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { placemarkSpec, CategorySpec } from "../models/joi-schemas.js";

export const placemarkApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        // const category = await db.categoryStore.getCategoryById(request.params.id);
        const placemark = await db.placemarkStore.addPlacemark(request.params.id, request.payload);
        // await db.placemarkStore.addplacemark(category._id, placemark);
        if (placemark) {
          return h.response(placemark).code(201); // this is an http code which means 'created'
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        await db.placemarkStore.deletePlacemark(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
  },
};
