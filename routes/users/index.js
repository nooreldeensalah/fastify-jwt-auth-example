"use strict";
/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
module.exports = async function (fastify, opts) {
  // Hook to validate Bearer token
  fastify.addHook("preHandler", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  const users = fastify.mongo.db.collection("users");
  users.createIndex({ username: 1 }, { unique: true });

  let queryOptions = { projection: { _id: 0 } };

  // Get all Users
  fastify.get("/", async function (request, reply) {
    const result = await users.find({}, queryOptions).toArray();

    if (result.length === 0) {
      reply.code(404).send("No documents are found");
    }

    reply.code(200).send(result);
  });

  // Get single User
  fastify.get("/:username", async function (request, reply) {
    const username = request.params.username;
    const result = await users.findOne({ username }, queryOptions);

    result
      ? reply.send(result)
      : reply.code(404).send({ message: "User not found" });
  });

  // Create user
  fastify.post("/", async function (request, reply) {
    const { name, username, email } = request.body;
    if (!username) {
      reply
        .code(400)
        .send({ message: "Invalid request: username is a required field" });
      return;
    }
    try {
      const result = await users.insertOne({ name, username, email });
      reply.code(201).send(result);
    } catch (error) {
      reply.code(422).send(error);
    }
  });

  // Update user
  fastify.patch("/:username", async function (request, reply) {
    const username = request.params.username;
    const requestPayload = request.body;

    if (!requestPayload || Object.keys(requestPayload).length === 0) {
      reply
        .code(400)
        .send({ message: "Bad request: the request body can't be empty" });
      return;
    }

    try {
      const result = await users.updateOne(
        { username },
        { $set: requestPayload }
      );
      reply.send(result);
    } catch (error) {
      throw new Error(error);
    }
  });

  // Delete user
  fastify.delete("/:username", async function (request, reply) {
    const username = request.params.username;

    if (!username) {
      reply
        .code(400)
        .send({ message: "Bad request: Username parameter is missing" });
      return;
    }

    const result = await users.deleteOne({ username });
    reply.send(result);
  });
};
