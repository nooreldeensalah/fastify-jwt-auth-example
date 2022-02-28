const { readFileSync } = require("fs");
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  // For more details on how to use the plugin, please refer to https://github.com/fastify/fastify-jwt

  // QUESTION: What does `generateToken` do in the frontend?

  // We can add token blacklisting feature using the `trusted` option https://github.com/fastify/fastify-jwt#trusted
  // We can format the `request.user` object using the `formatUser` option https://github.com/fastify/fastify-jwt#formatuser
  // We can override the http messages as well https://github.com/fastify/fastify-jwt#messages
  // We can use `verify.extractToken` to customize the token location, example:
  // --> verify: { extractToken: (request) => request.headers["refresh-token"] }, // Takes the token from the request.headers['refresh-token']
  // Custom Options:
  // ->     // sign: { algorithm: "RS256" }, // We can add issuer here as well and add it to the verify key
  // -> verify: { allowedIss: "api.example.tld" },
  // -> decode: { checkTyp: "JWT" },

  // Access tokens jwt handler
  fastify.register(require("fastify-jwt"), {
    secret: {
      private: readFileSync("./certs/access/private.key", "utf8"),
      public: readFileSync("./certs/access/public.key", "utf8"),
    },
    namespace: "access",
  });

  // Refresh tokens jwt handler
  fastify.register(require("fastify-jwt"), {
    secret: {
      private: readFileSync("./certs/refresh/private.key", "utf-8"),
      public: readFileSync("./certs/refresh/public.key", "utf-8"),
    },
    namespace: "refresh",
  });
});
