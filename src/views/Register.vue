<template>
  <div>
    <form @submit.prevent="register">
      <label for="name"> Name: </label>
      <input v-model="name" type="text" name="name" value />

      <label for="username"> Username: </label>
      <input v-model="username" type="text" name="username" value />

      <label for="password"> Password: </label>
      <input v-model="password" type="password" name="password" value />

      <button type="submit" name="button">Register</button>
    </form>
  </div>
  <router-link to="/login"> Already have an account? Login. </router-link>
  <div>
    {{ registrationError }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: String(),
      username: String(),
      password: String(),
      registrationError: String(),
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
          username: this.username,
          password: this.password,
        })
        .then(() => this.$router.push({ name: "Home" }))
        .catch(
          (error) => (this.registrationError = error.response.data.message)
        );
    },
  },
};
</script>

<style></style>
