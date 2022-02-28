"use strict";

const { getUserSchema } = require("../../schemas");
/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  let users = fastify.mongo.db.collection("users");

  fastify.get(
    "/:id",
    { onRequest: fastify.authenticate, schema: getUserSchema },
    async function (request, reply) {
      let _id;
      try {
        _id = fastify.mongo.ObjectId(request.params.id);
      } catch (error) {
        reply.code(422).send(error);
        return;
      }

      const result = await users.findOne({ _id });

      result
        ? reply.send(result)
        : reply.code(404).send({ message: "User not found" });
    }
  );
};
