const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 12,
  });
});
