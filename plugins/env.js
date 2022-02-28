const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-env"), {
    dotenv: true,
    schema: {
      type: "object",
      required: ["MONGODB_URI"],
      properties: {
        MONGODB_URI: {
          type: "string",
        },
      },
    },
  });
});
