"use strict";
const { signUpSchema } = require("../../schemas");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  let users = fastify.mongo.db.collection("users");

  fastify.post(
    "/users",
    { onRequest: fastify.authenticate, schema: signUpSchema },
    async (request, reply) => {
      let { name, username, password } = request.body;

      let passwordHash = await fastify.bcrypt.hash(password);

      let userExists = await users.findOne({ username });
      if (userExists) {
        reply.unprocessableEntity("Username already exists");
        return;
      }

      try {
        users.insertOne({ name, username, passwordHash });
        const token = fastify.jwt.access.sign({ name, username });
        reply.code(201).send({ token });
      } catch (error) {
        reply.unprocessableEntity(error.message);
      }
    }
  );
};

module.exports.prefixOverride = "";
