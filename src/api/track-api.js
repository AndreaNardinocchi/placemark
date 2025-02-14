import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { TrackSpec, CategorySpec } from "../models/joi-schemas.js";

export const trackApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const tracks = await db.trackStore.getAllTracks();
        return tracks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const track = await db.trackStore.getTrackById(request.params.id);
        if (!track) {
          return Boom.notFound("No track with this id");
        }
        return track;
      } catch (err) {
        return Boom.serverUnavailable("No track with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        // const category = await db.categoryStore.getCategoryById(request.params.id);
        const track = await db.trackStore.addTrack(request.params.id, request.payload);
        // await db.trackStore.addTrack(category._id, track);
        if (track) {
          return h.response(track).code(201); // this is an http code which means 'created'
        }
        return Boom.badImplementation("error creating track");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.trackStore.deleteAllTracks();
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
        const track = await db.trackStore.getTrackById(request.params.id);
        if (!track) {
          return Boom.notFound("No Track with this id");
        }
        await db.trackStore.deleteTrack(track._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Track with this id");
      }
    },
  },
};
