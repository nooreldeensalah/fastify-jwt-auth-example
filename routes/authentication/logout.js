"use strict";

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  fastify.route({
    method: "DELETE",
    url: "/users/logout",
    onRequest: fastify.auth.protectRoute,
    handler: async function (request, reply) {
      try {
        const { _id: userId } = await request.refreshJwtVerify();
        const storedRefreshToken = await fastify.redis.get(userId);

        if (!storedRefreshToken) {
          return reply
            .status(200)
            .send({ message: "You are already logged out" });
        }

        if (storedRefreshToken !== request.headers["refresh-token"]) {
          return reply.unauthorized();
        }

        await fastify.redis.del(userId);
        reply.status(200).send({ message: "Successfully logged out" });
      } catch (error) {
        reply.unauthorized(error.message);
      }
    },
  });
};

module.exports.prefixOverride = "";
