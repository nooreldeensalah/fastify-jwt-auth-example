"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  // Decorate the request objects with a `tokens` property; used to hold tokens in case of expiry
  fastify.decorateRequest("tokens", null);
  // JWT Authentication Hook
  const protectRoute = async function (request, reply) {
    try {
      await request.accessJwtVerify();
    } catch (err) {
      // The access token is valid but it's expired
      if (err.message === "Authorization token expired") {
        const tokens = await refreshTokens(request, reply);
        request.tokens = tokens;
      } else {
        reply.unauthorized(err.message);
      }
    }
  };

  // Signing JWT Access and Refresh tokens
  const signTokens = async function (payload) {
    try {
      const { passwordHash, ...tokenPayload } = payload;

      const userId = tokenPayload._id;

      const accessToken = await fastify.jwt.access.sign(tokenPayload);

      const refreshToken = await fastify.jwt.refresh.sign(tokenPayload);

      // Add the refresh token as the 'value' for the 'userId' key
      await fastify.redis.setex(userId, 7 * 24 * 60 * 60, refreshToken);
      

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
    }
  };

  // PreSerialization hook to check for the added token pairs in case the user made a request with an expired access token, but a valid refresh token.
  const checkForRefreshedTokens = async (request, reply, payload) => {
    if (request.tokens) {
      payload.tokens = request.tokens;
    }
    return payload;
  };

  // Refreshing Tokens
  const refreshTokens = async (request, reply) => {
    try {
      const { iat, exp, ...payload } = await request.refreshJwtVerify();

      const storedRefreshToken = await fastify.redis.get(payload._id);

      // If the user doesn't have a refresh token in the database
      if (!storedRefreshToken) {
        return reply.unauthorized();
      }

      // if the refresh tokens in the headers doesn't match the stored refresh token in the database
      if (storedRefreshToken !== request.headers["refresh-token"]) {
        return reply.unauthorized();
      }

      await fastify.redis.del(payload._id); // Refresh token can only be used once.
      const { accessToken, refreshToken } = await fastify.auth.signTokens(
        payload
      );

      return { accessToken, refreshToken };
    } catch (error) {
      reply.unauthorized(error.message);
    }
  };

  fastify.decorate("auth", {
    protectRoute,
    signTokens,
    refreshTokens,
    checkForRefreshedTokens,
  });
});
