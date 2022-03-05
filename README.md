# Fastify JWT Authentication API

This is a simple API with [fastify](https://www.fastify.io/) as the backend web framework, and [MongoDB](https://www.mongodb.com/) as the database of choice.

The motivation of this project was to learn fastify as a framework, and to learn and implement JWT authentication with refresh tokens.

I've attempted to use only fastify ecosystem plugins in this project, and to use fastify related concepts such as hooks, and decorators, and to utilize the request/response lifecycle.

The project template was scaffolded using [fastify-cli](https://github.com/fastify/fastify-cli) plugin, and uses other fastify plugins.

## Plugins used

- `fastify-cli` : Initialize a starter template for fastify projects.
- `fastify-autoreload` : Automatically reload routes and plugins.
- `fastify-bcrypt` : Hash the password before storing it into the database.
- `fastify-cors` : Allow CORS to call the API from the frontend.
- `fastify-env` : Load environment variables from a `.env` file.
- `fastify-jwt` : Implement JWT authentication for `/users` route endpoints.
- `fastify-mongodb` : Database driver for MongoDB.
- `fastify-swagger`: Generate API documentation.
- `fastify-rate-limit`: Rate limiting requests on the API
- `fastify-sensible`: HTTP error messages.

## Documentation

The API documentation can be found at the root route `/docs`.

## Instructions

To run the project locally, make sure to add `MONGODB_URI` environment variables to a `.env` file, and two pairs of public and private keys in `certs` directory.

```
📦certs
 ┣ 📂access
 ┃ ┣ 📜private.key
 ┃ ┗ 📜public.key
 ┗ 📂refresh
 ┃ ┣ 📜private.key
 ┃ ┗ 📜public.key
```

Install the required npm packages

```
npm install
```

To run the application in dev mode:

```
npm run dev
```

And to run the application in production mode:

```
npm run start
```
