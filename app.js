"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  // Registering the plugins

  fastify.register(require("fastify-env"), {
    dotenv: true,
    schema: {
      type: "object",
      required: ["MONGODB_URI", "JWT_SECRET"],
      properties: {
        MONGODB_URI: {
          type: "string",
        },
        JWT_SECRET: { type: "string" },
      },
    },
  });

  fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 12,
  });

  fastify.register(require("fastify-cors"));

  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_SECRET,
  });

  fastify.register(require("fastify-mongodb"), {
    forceClose: true, // Force close the database connection when the app is stopped.
    url: process.env.MONGODB_URI,
  });

  fastify.register(require("fastify-swagger"), {
    exposeRoute: true,
    routePrefix: "/",
    swagger: {
      info: {
        title: "Users API",
      },
    },
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, "plugins"),
  //   options: Object.assign({}, opts),
  // });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
