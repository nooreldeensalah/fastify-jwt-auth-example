"use strict";

const {
  getAllUsersSchema,
  getUserSchema,
  patchUserSchema,
  deleteUserSchema,
} = require("../../schemas");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
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
  fastify.get(
    "/",
    { schema: getAllUsersSchema },
    async function (request, reply) {
      const result = await users.find().toArray();

      if (result.length === 0) {
        reply.code(404).send({ message: "No users are found" });
        return;
      }

      reply.code(200).send(result);
    }
  );

  // Get single User
  fastify.get(
    "/:id",
    { schema: getUserSchema },
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

  // Update user
  fastify.patch(
    "/:id",
    { schema: patchUserSchema },
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

  // Delete user
  fastify.delete(
    "/:id",
    { schema: deleteUserSchema },
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
