"use strict";
/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
module.exports = async function (fastify, opts) {
  // Grab users collection from the database
  const users = fastify.mongo.db.collection("users");
  // Require the username field to be unique
  users.createIndex({ username: 1 }, { unique: true });

  // Hook to validate Bearer token
  fastify.addHook("preHandler", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Get all Users
  fastify.get("/", async function (request, reply) {
    const result = await users.find().toArray();

    if (result.length === 0) {
      reply.code(404).send("No documents are found");
      return;
    }

    reply.code(200).send(result);
  });

  // Get single User
  fastify.get("/:id", async function (request, reply) {
    const _id = fastify.mongo.ObjectId(request.params.id);
    const result = await users.findOne({ _id });

    result
      ? reply.send(result)
      : reply.code(404).send({ message: "User not found" });
  });

  // Update user
  fastify.patch("/:id", async function (request, reply) {
    const _id = fastify.mongo.ObjectId(request.params.id);
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
  });

  // Delete user
  fastify.delete("/:id", async function (request, reply) {
    const _id = fastify.mongo.ObjectId(request.params.id);

    if (!_id) {
      reply.code(400).send({ message: "Bad request: ID is missing" });
      return;
    }

    const result = await users.deleteOne({ _id });
    reply.send(result);
  });
};
