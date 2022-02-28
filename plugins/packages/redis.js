const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-redis"), {
    port: 6379,
    host: "localhost",
  });
});
