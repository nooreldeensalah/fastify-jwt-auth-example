const { readFile } = require("fs").promises;
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  // For more details on how to use the plugin, please refer to https://github.com/fastify/fastify-jwt


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
      private: await readFile("./certs/access/private.key", "utf8"),
      public: await readFile("./certs/access/public.key", "utf8"),
    },
    namespace: "access",
    sign: { expiresIn: "5h" },
  });

  // Refresh tokens jwt handler
  fastify.register(require("fastify-jwt"), {
    secret: {
      private: await readFile("./certs/refresh/private.key", "utf-8"),
      public: await readFile("./certs/refresh/public.key", "utf-8"),
    },
    namespace: "refresh",
    sign: { expiresIn: "7d" },
    verify: { extractToken: (request) => request.headers["refresh-token"] },
  });
});
