"use strict";

const { loginSchema, signUpSchema } = require("../schemas");

/**
 * This line is added to support auto-completion for the fastify instance
 * @param {import("fastify").FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  // MongoDB Users collection
  let users = fastify.mongo.db.collection("users");

  // Signup endpoint
  fastify.post("/signup", { schema: signUpSchema }, async (request, reply) => {
    let payload = request.body;
    let { name, username, password } = payload;

    let passwordHash = await fastify.bcrypt.hash(password);

    let userExists = await users.findOne({ username });
    if (userExists) {
      reply.code(422).send({ message: "Username already exists" });
      return;
    }

    try {
      users.insertOne({ name, username, passwordHash });
      delete payload.password; // Remove the password from the payload that gets signed for the token.
      const token = await fastify.jwt.sign({ payload });
      reply.code(201).send({ token });
    } catch (error) {
      reply.code(422).send(error);
    }
  });

  // Login endpoint
  fastify.post("/login", { schema: loginSchema }, async (request, reply) => {
    const payload = request.body;
    let { username, password } = payload;

    let user = await users.findOne({ username });
    // If the user already exists in the database, assign a token, if not, give an error.
    if (user) {
      let passwordMatch = await fastify.bcrypt.compare(
        password,
        user.passwordHash
      );

      if (passwordMatch) {
        delete payload.password;
        const token = await fastify.jwt.sign(payload);
        reply.send({ token });
      } else {
        reply
          .code(401)
          .send({ message: "Invalid username and password combination" });
      }
    } else {
      reply
        .code(401)
        .send({ message: "Invalid username and password combination" });
    }
  });
};
