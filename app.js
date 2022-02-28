"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  // For more details on how to use `fastify-autoload` plugin, refer to the docs https://github.com/fastify/fastify-autoload
  // This loads all plugins defined in the `plugins` directory
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
  });

  // This loads all plugins defined in the `routes` directory
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
  });
};
