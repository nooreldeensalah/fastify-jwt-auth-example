# Fastify Users API

This is a simple API with [fastify](https://www.fastify.io/) as the backend web framework, and [MongoDB](https://www.mongodb.com/) as the database of choice.

The project template was scaffolded using [fastify-cli](https://github.com/fastify/fastify-cli) plugin, and uses other fastify plugins.

## Plugins used

- `fastify-cli` : Initialize a starter template for fastify projects.
- `fastify-autoreload` : aAutomatically reload routes and plugins.
- `fastify-bcrypt` : Hash the password before storing it into the database.
- `fastify-cors` : Allow CORS to call the API from the frontend.
- `fastify-env` : Load environment variables from a `.env` file.
- `fastify-jwt` : Implement JWT authentcation for `/users` route endpoints.
- `fastify-mongodb` : Database driver for MongoDB.
- `fastify-swagger`: Generate API documentation.

## Documentation

The API documentation can be found at the root route `/`.

## Instructions

To run the project locally, make sure to add `JWT_SECRET` and `MONGODB_URI` environment variables to a `.env` file.

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
