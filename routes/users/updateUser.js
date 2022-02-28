"use strict";

const { patchUserSchema } = require("../../schemas");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  let users = fastify.mongo.db.collection("users");

  fastify.patch(
    "/:id",
    { onRequest: fastify.authenticate, schema: patchUserSchema },
    async function (request, reply) {
      let _id;
      try {
        _id = fastify.mongo.ObjectId(request.params.id);
      } catch (error) {
        reply.code(422).send(error);
        return;
      }

      const payload = request.body;

      if (!payload || Object.keys(payload).length === 0) {
        reply
          .code(400)
          .send({ message: "Bad request: the request body can't be empty" });
        return;
      }

      try {
        if (payload.password) {
          payload.passwordHash = await fastify.bcrypt.hash(payload.password);
          delete payload.password;
        }

        const result = await users.updateOne({ _id }, { $set: payload });
        reply.send(result);
      } catch (error) {
        throw new Error(error);
      }
    }
  );
};
