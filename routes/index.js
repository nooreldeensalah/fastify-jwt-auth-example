"use strict";

const {
  loginSchema,
  signUpSchema,
  deleteUserSchema,
  getAllUsersSchema,
  getUserSchema,
  patchUserSchema,
} = require("../schemas");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  // MongoDB Users collection
  let users = fastify.mongo.db.collection("users");
  // Require the username field to be unique
  users.createIndex({ username: 1 }, { unique: true });

  // JWT Authentication Hook
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.accessJwtVerify();
    } catch (err) {
      reply.unauthorized(err.message);
    }
  });

  // Signup endpoint
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

  // Login endpoint
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
        const token = fastify.jwt.access.sign({ username }, { expiresIn: "5h" });
        console.log(fastify.jwt.access.decode(token));
        reply.send({ token });
      } else {
        reply.badRequest("Invalid username and password combination");
      }
    }
  );

  // Get all Users
  fastify.get(
    "/users",
    { onRequest: fastify.authenticate, schema: getAllUsersSchema },
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
    "/users/:id",
    { onRequest: fastify.authenticate, schema: getUserSchema },
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
    "/users/:id",
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

  // Delete user
  fastify.delete(
    "/users/:id",
    { onRequest: fastify.authenticate, schema: deleteUserSchema },
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
