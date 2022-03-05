const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-rate-limit"), {
    global: false,
    max: 3,
    timeWindow: "1 minute",
  });
});
