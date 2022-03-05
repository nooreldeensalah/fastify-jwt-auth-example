"use strict";

const { deleteUserSchema } = require("../../schemas");
/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  let users = fastify.mongo.db.collection("users");
  // Delete user
  fastify.delete(
    "/:id",
    {
      onRequest: fastify.auth.protectRoute,
      schema: deleteUserSchema,
      preSerialization: fastify.auth.checkForRefreshedTokens,
    },
    async function (request, reply) {
      let _id;
      try {
        _id = fastify.mongo.ObjectId(request.params.id);
      } catch (error) {
        reply.code(422).send(error);
        return;
      }

      const result = await users.deleteOne({ _id });
      reply.send(result);
    }
  );
};
