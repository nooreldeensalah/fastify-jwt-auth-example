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
    async (request, reply) => {
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
        const token = fastify.jwt.access.sign(
          { username },
          { expiresIn: "5h" }
        );
        console.log(fastify.jwt.access.decode(token));
        reply.send({ token });
      } else {
        reply.badRequest("Invalid username and password combination");
      }
    }
  );
};

module.exports.prefixOverride = "";
