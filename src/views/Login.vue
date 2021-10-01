<template>
  <div>
    <form @submit.prevent="login">
      <label for="username"> Username: </label>
      <input v-model="username" name="username" value />

      <label for="password"> Password: </label>
      <input v-model="password" type="password" name="password" value />

      <button type="submit" name="button">Login</button>
    </form>
  </div>
  <router-link to="/register"> Don't have an account? Register. </router-link>
  <div>
    {{ loginError }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: String(),
      password: String(),
      loginError: String(),
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password,
        })
        .then(() => this.$router.push({ name: "Home" }))
        .catch((error) => (this.loginError = error.response.data.message));
    },
  },
};
</script>

<style></style>
