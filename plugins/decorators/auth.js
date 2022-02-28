"use strict";

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  // JWT Authentication Hook
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.accessJwtVerify();
    } catch (err) {
      reply.unauthorized(err.message);
    }
  });
};
