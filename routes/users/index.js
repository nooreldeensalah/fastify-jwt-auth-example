"use strict";
/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
module.exports = async function (fastify, opts) {
  // Get all Users
  fastify.get("/", async function (request, reply) {
    return { root: true };
  });

  // Get single User
  fastify.get("/:id", async function (request, reply) {
    const userID = request.params.id;
    return { id: userID };
  });

  // Create user
  fastify.post("/", async function (request, reply) {
    return request.body;
  });

  // Update user
  fastify.patch("/:id", async function (request, reply) {
    //   Logic to update the user data
  });

  // Delete user
  fastify.delete("/:id", async function (request, reply) {
    //   Logic to delete the user
  });
};
