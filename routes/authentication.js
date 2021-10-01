"use strict";
/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
module.exports = async function (fastify, opts) {
  // MongoDB Users collection
  let users = fastify.mongo.db.collection("users");

  // Signup endpoint
  fastify.post("/signup", async (request, reply) => {
    let payload = request.body;

    if (!payload.username || !payload.password || !payload.name) {
      reply.code(400).send({ message: "Bad request: Missing fields" });
      return;
    }

    let { username, password } = payload;

    let passwordHash = await fastify.bcrypt.hash(password);

    let userExists = await users.findOne({ username });
    if (userExists) {
      reply.code(422).send({ message: "Username already exists" });
      return;
    }

    try {
      users.insertOne({ username, passwordHash });
      delete payload.password; // Remove the password from the payload that gets signed for the token.
      const token = await fastify.jwt.sign({ payload });
      reply.send({ token });
    } catch (error) {
      reply.code(422).send(error);
    }
  });

  // Login endpoint
  fastify.post("/login", async (request, reply) => {
    const payload = request.body;

    if (!payload.username || !payload.password) {
      reply.code(400).send({ message: "Bad request: missing fields" });
      return;
    }

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
