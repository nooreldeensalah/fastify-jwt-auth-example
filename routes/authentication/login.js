"use strict";

const { loginSchema } = require("../../schemas");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  let users = fastify.mongo.db.collection("users");

  fastify.post(
    "/users/authenticate",
    { schema: loginSchema },
    async function (request, reply) {
      const { username, password } = request.body;

      let user = await users.findOne({ username });
      // If the user already exists in the database, assign a token, if not, give an error.

      if (user === null) {
        reply.notFound("User not found");
        return;
      }

      let passwordMatch = await fastify.bcrypt.compare(
        password,
        user.passwordHash
      );


      if (passwordMatch) {
        const tokens = await fastify.auth.signTokens(user);
        reply.code(201).send(tokens);
      } else {
        reply.badRequest("Invalid username and password combination");
      }
    }
  );
};

module.exports.prefixOverride = "";
