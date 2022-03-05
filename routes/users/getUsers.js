"use strict";

const { getAllUsersSchema } = require("../../schemas");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  let users = fastify.mongo.db.collection("users");

  fastify.get(
    "",
    {
      onRequest: fastify.auth.protectRoute,
      schema: getAllUsersSchema,
      preSerialization: fastify.auth.checkForRefreshedTokens,
    },
    async function (request, reply) {
      const result = await users.find().toArray();

      if (result.length === 0) {
        reply.code(404).send({ message: "No users are found" });
        return;
      }

      reply.code(200).send({ result });
    }
  );
};
