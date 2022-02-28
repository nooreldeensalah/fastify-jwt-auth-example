const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-mongodb"), {
    forceClose: true, // Force close the database connection when the app is stopped.
    url: process.env.MONGODB_URI,
  });
});
