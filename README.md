# Users Dashboard

This is a simple Vue 3 application that implements JWT authentication with a backend API.

The project starter template was scaffolded using [Vue CLI](https://cli.vuejs.org/).

## Used libraries

- `vuex`: Authentication state management
- `vue-router`: Client-side routing.
- `axios`: Making requests with the backend API.

## Routes

The application serves serves four routes:
`/`: Home page.
`/login`: Login page.
`/register`: Registration page
`/dashboard`: A table where the users data is fetched from a protected API route that requires authentication.

## Instructions

To run this app locally, install the required npm packages.

```
npm install
```

Then serve the application

```
npm run serve
```
